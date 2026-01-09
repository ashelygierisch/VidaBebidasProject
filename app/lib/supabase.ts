import { createClient } from '@supabase/supabase-js'
import { env } from 'node:process'
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)

export default {supabase}