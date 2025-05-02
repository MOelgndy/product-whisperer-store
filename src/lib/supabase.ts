
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseKey || ''
);

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  const { data, error } = await supabase.auth.getSession();
  return !!data.session;
}
