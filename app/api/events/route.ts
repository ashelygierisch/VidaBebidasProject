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

  // export async function POST(request: Request){

  //   try {
  //       const body= request.json();

  //       const {date, time, service, message, userId}=body;


        
  //       const booking= await prisma.booking.create({
  //         data: 
  //         {
  //           date, time, service, message, userId
  //         }
  //       }
  //   }
  // }