import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_DATABASE_SUPABASE_URL!;
const supabaseKey = process.env.DATABASE_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.DATABASE_SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
