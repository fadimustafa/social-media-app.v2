import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_KEY;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SECRAT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
