import { createClient as createClientSupabase } from "@supabase/supabase-js";

export const createClient = () => (
  createClientSupabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  )
)
