import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Force dynamic - this must actually hit the database on every call
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PRIVATE_SUPABASE_PRIVATE_KEY! // Service role key for server-side API routes
);

// GET - Lightweight query that keeps the free-tier Supabase project from pausing.
// Supabase pauses projects after ~7 days with no activity; Vercel Cron hits this daily.
export async function GET(request: Request) {
  // Vercel automatically sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    // HEAD-style count: no rows transferred, but a real query against Postgres.
    const { count, error } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        { ok: false, error: 'Keep-alive query failed', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, count: count ?? 0, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
