import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.PUBLIC_SUPABASE_URL || '').trim();
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE || '').trim();

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase admin client misconfigured: set PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE.');
}

export const sba = createClient(supabaseUrl, serviceRoleKey);
