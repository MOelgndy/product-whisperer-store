
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Get environment variables or use placeholder values to prevent app from crashing
// These need to be replaced with actual Supabase credentials when deploying
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Display a warning if environment variables are missing
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables. The app will not connect to a real Supabase backend.');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey
);

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  try {
    const { data, error } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

// Helper function to check if we have valid Supabase credentials
export function hasValidSupabaseConfig() {
  return import.meta.env.VITE_SUPABASE_URL && 
         import.meta.env.VITE_SUPABASE_URL.includes('.supabase.co') && 
         import.meta.env.VITE_SUPABASE_ANON_KEY && 
         import.meta.env.VITE_SUPABASE_ANON_KEY.length > 20;
}
