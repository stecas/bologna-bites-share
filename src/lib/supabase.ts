
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipi per il database
export type Template = {
  id: string;
  user_id: string;
  title: string;
  subtitle: string;
  created_at: string;
  updated_at: string;
};

export type Restaurant = {
  id: string;
  template_id: string;
  name: string;
  rating: number;
  cuisine: string;
  address: string;
  image: string;
  recommendations: string[];
  notes: string;
  created_at: string;
  updated_at: string;
};
