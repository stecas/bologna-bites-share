
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://obxfcvqhhauvqzhezqqw.supabase.co',
  window.SUPABASE_ANON_KEY
);

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
