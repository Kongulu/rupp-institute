import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase client misconfigured: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY must be set.');
}

export const sb = createClient(supabaseUrl, supabaseAnonKey);
