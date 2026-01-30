import { createClient } from "@supabase/supabase-js"

// Client-side Supabase instance (uses anon key - safe for browser)
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabaseClient
