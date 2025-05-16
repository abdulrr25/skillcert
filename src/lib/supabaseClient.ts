import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yascdkkknxzlseitggmr.supabase.co'; // Replace with your Supabase Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhc2Nka2trbnh6bHNlaXRnZ21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODUxNTIsImV4cCI6MjA2MjM2MTE1Mn0.9tBl_wyOXcBL7Wjfoix-l3Z0d-EsLhh9gN_nCIj6kKk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);