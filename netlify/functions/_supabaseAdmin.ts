import { createClient } from '@supabase/supabase-js';
export const sba = createClient(
  process.env.PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string
);
