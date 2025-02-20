
import { createClient } from '@supabase/supabase-js';

// Estendiamo l'interfaccia Window per includere le proprietà Supabase
declare global {
  interface Window {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  }
}

// Creiamo il client Supabase usando le credenziali globali
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
