import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANONKEY

const realtime_opt = {
  realtime: {
    params: {
      eventsPerSecond: 10,
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, realtime_opt)