import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from 'crypto';

import posthog from '@/app/lib/posthog--server';
import { sendBookingConfirmation } from '@/app/lib/email';

// Force dynamic - prevents Next.js from caching this route
export const dynamic = 'force-dynamic';

// Create Supabase client with service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PRIVATE_SUPABASE_PRIVATE_KEY! // Service role key for server-side API routes
);


export async function GET() {
  try {

    const { data: users, error } = await supabase
      .from("users")
      .select(`
        *,
        bookings(*)
      `);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users', details: error.message },
        { status: 500 }
      );
    }

    if (!users) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 404 }
      );
    }

    console.log("All users with bookings:", users);

    return NextResponse.json(users, {
      status: 200,
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('1. Received body:', body);
    const {
      eventDate,
      startTime,
      endTime,
      serviceType,

      clientName,
      clientEmail,
      clientPhone,

      venueName,
      venueType,
      address,
      city,
      guestCount,
      barOption,
      message,

      status,
      source,
      promoCampaign,
      electronicSignature,
      confirmWaiver,
      waiverVersion
    } = body

   const {data:existingUser, error:userError}=await supabase.from('users')
   .select('id')
    .eq('email', clientEmail)
    .single()

    console.log('2. User lookup result:', { existingUser, userError });

    let userId

    if (userError && userError.code !== 'PGRST116') { 
      throw userError
    }
  console.log('3. userId:', userId);

  if(existingUser){
    userId=existingUser.id
   
    // Update user's waiver info if they're signing again (for quick checks)
    if (electronicSignature && confirmWaiver) {
      await supabase
        .from('users')
        .update({
          electronicSignature,
          confirmWaiver: true,
          waiverSignedAt: new Date().toISOString()
        })
        .eq('id', userId)
    }
  }else{
    // Create new user with waiver info
    const waiverSignedAt = (electronicSignature && confirmWaiver) 
      ? new Date().toISOString() 
      : null
    
    const { data: newUser, error: createUserError } = await supabase
      .from('users')
      .insert([{ 
        id: randomUUID(),
        name: clientName, 
        email: clientEmail, 
        phone: clientPhone,
        electronicSignature: electronicSignature || null,
        confirmWaiver: confirmWaiver || false,
        waiverSignedAt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select('id')
      .single()
  
    if (createUserError) throw createUserError
    userId = newUser.id 
  }
   
 
// Check if date already has bookings
const { data: existingBookings, error: bookingCheckError } = await supabase
  .from('bookings')
  .select('id')
  .eq('eventDate', eventDate);

if (bookingCheckError) {
  throw bookingCheckError;
}

// Determine status based on existing bookings
const hasExistingBooking = existingBookings && existingBookings.length > 0;
const bookingStatus = hasExistingBooking ? 'REQUESTED' : 'PENDING';
const needsConfirmation = hasExistingBooking;

console.log('4. About to create booking with eventDate:', eventDate);

//Create the booking
    const { data: newBooking, error:bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          id: randomUUID(),
          eventDate,
          startTime,
          endTime,
          serviceType,

          clientName,
          clientEmail,
          clientPhone,

          venueName,
          venueType,
          city,
          address,
          guestCount,
          barOption,
          message,

          status: bookingStatus,
          requiresStaffConfirmation: needsConfirmation,
          updatedAt: new Date().toISOString(),
          source,
          promoCampaign,

          // 🖊️ Waiver (per-booking signature)
          electronicSignature: electronicSignature || null,
          confirmWaiver: confirmWaiver || false,
          waiverSignedAt: (electronicSignature && confirmWaiver) 
            ? new Date().toISOString() 
            : null,
          waiverVersion: waiverVersion || null,
          depositPaid: false,

          userId,
          createdAt: new Date().toISOString()
        }
      ])
      .select()
      .single()

      console.log('5. Booking result:', { newBooking, bookingError });


      await sendBookingConfirmation(newBooking);

      // Send push notification to admin on ALL their devices
try {
  // Get admin user's ID from Supabase auth
  const { data: adminUsers } = await supabase.auth.admin.listUsers();
  const adminUser = adminUsers?.users?.[0]; // Assuming single admin
  
  if (adminUser) {
    console.log('Sending notification to admin user ID:', adminUser.id);
    
    // Send push notification via OneSignal REST API using External User ID
    // This will deliver to ALL devices where the admin is logged in (laptop, phone, etc.)
    const notifResponse = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        include_external_user_ids: [adminUser.id], // Uses external user ID instead of player ID
        headings: { en: 'New Booking Request!' },
        contents: { 
          en: `${clientName} booked ${serviceType} for ${new Date(eventDate).toLocaleDateString()}` 
        },
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/dashboard`,
      }),
    });
    const notifResult = await notifResponse.json();
    console.log('OneSignal response:', notifResult);
  }
} catch (notifError) {
  // Don't fail the booking if notification fails
  console.error('Push notification error:', notifError);
}
      if (bookingError) {
        throw bookingError
      }

      posthog.capture({
        distinctId: clientEmail, 
        event: 'Booking Created',
        properties: { 
          source: source,
          serviceType: serviceType,
          city: city,
          guestCount: guestCount,
          venueType: venueType,
          bookingStatus: bookingStatus,
        }
      });
      
    
      await posthog.flush();


      return NextResponse.json( 
        { booking: newBooking, message: 'Booking created successfully' },
        { status: 201 }
      );


    } catch (error) {
      // Log the full error to your server console
      console.error('Booking creation error:', error);
      
      // Return more details in the response (for debugging)
      return NextResponse.json(
        { 
          error: 'Failed to create booking',
          details: error instanceof Error ? error.message : String(error)
        },
        { status: 500 }
      )
    }
}
