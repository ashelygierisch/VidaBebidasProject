import { createClient} from "@supabase/supabase-js";

const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PRIVATE_SUPABASE_PRIVATE_KEY!)

export default supabaseServer