import { NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";

// Create Supabase client with service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! // Use service role key for API routes
);

export async function GET() {
  try {

    const { data: users, error } = await supabase
      .from("User")
      .select(`
        *,
        bookings:Booking(*)
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
      electronicSignature
    } = body

   const {data:existingUser, error:userError}=await supabase.from('User')
   .select('id')
    .eq('email', clientEmail)
    .single()

    let userId

    if (userError && userError.code !== 'PGRST116') { 
      throw userError
    }

  if(existingUser){
    userId=existingUser.id
  }else{
    const { data: newUser, error: userError } = await supabase
    .from('User')
    .insert([{ name: clientName, email:clientEmail, phone:clientPhone, electronicSignature,         createdAt: new Date().toISOString() }])
    .select('id')
    .single()
  
  if (userError) throw userError
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
