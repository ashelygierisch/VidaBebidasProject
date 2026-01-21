import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";

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
      barType,
      message,

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

    let userId

    if (userError && userError.code !== 'PGRST116') { 
      throw userError
    }

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
        name: clientName, 
        email: clientEmail, 
        phone: clientPhone,
        electronicSignature: electronicSignature || null,
        confirmWaiver: confirmWaiver || false,
        waiverSignedAt,
        createdAt: new Date().toISOString() 
      }])
      .select('id')
      .single()
  
    if (createUserError) throw createUserError
    userId = newUser.id 
  }
   
 
  const {data: existingBooking, error: bookingCheckError}= await supabase.from('bookings')
    .select('id')
    .eq('eventDate', eventDate)
    .single()
  
    if (bookingCheckError && bookingCheckError.code !== 'PGRST116') {
      throw bookingCheckError
    }

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This date is already booked' },
        { status: 409 } 
      )
    }

//Create the booking
    const { data: newBooking, error:bookingError } = await supabase
      .from('bookings')
      .insert([
        {
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
          barType,
          message,

          source,
          promoCampaign,

          // 🖊️ Waiver (per-booking signature)
          electronicSignature: electronicSignature || null,
          confirmWaiver: confirmWaiver || false,
          waiverSignedAt: (electronicSignature && confirmWaiver) 
            ? new Date().toISOString() 
            : null,
          waiverVersion: waiverVersion || null,

          status: 'PENDING',
          depositPaid: false,

          userId,
          createdAt: new Date().toISOString()
        }
      ])
      .select()
      .single()


      if (bookingError) {
        throw bookingError
      }

      return NextResponse.json(
        { booking: newBooking, message: 'Booking created successfully' },
        { status: 201 }
      )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create booking' }),
      { status: 500 }
    )
  }
}
