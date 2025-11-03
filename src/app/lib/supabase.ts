import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'test';
const supabaseSecretKey = process.env.SUPABASE_API || 'test';

if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey);