import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PRIVATE_SUPABASE_PRIVATE_KEY! // Need service role to update user metadata
);

export async function POST(request: NextRequest) {
  try {
    const { playerId } = await request.json();
    
    if (!playerId) {
      return NextResponse.json({ error: 'Player ID required' }, { status: 400 });
    }

    // Get the current user from the auth header/cookie
    const authHeader = request.headers.get('authorization');
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader?.replace('Bearer ', '')
    );

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store player ID in user metadata
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { onesignal_player_id: playerId }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}