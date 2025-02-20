
import { createClient } from '@supabase/supabase-js';

// In Lovable, le credenziali Supabase sono disponibili globalmente una volta 
// che ci si è connessi attraverso l'interfaccia
export const supabase = createClient(
  window.SUPABASE_URL,
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
