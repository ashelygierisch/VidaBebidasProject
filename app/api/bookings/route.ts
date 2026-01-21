import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PRIVATE_SUPABASE_PRIVATE_KEY! // Service role key for server-side API routes
  );
  

export async function GET() {
    try {
  
      const { data: bookedDates, error } = await supabase
        .from("bookings")
        .select(`
          eventDate
        `);
  
      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch booking dates', details: error.message },
          { status: 500 }
        );
      }
  
      if (!bookedDates) {
        return NextResponse.json(
          { error: 'No bookings found' },
          { status: 404 }
        );
      }
  
      console.log("All booked dates:", bookedDates);
  
      return NextResponse.json(bookedDates, {
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