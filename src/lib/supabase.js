import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual values from your Supabase project
// For now, we're using placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 