import { createClient as createBrowserSupabaseClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase environment variables are missing.");
    }
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createBrowserSupabaseClient();
  }

  return supabaseInstance;
}
