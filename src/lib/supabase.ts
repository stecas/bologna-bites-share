
import { createClient } from '@supabase/supabase-js';

// Creiamo il client Supabase con l'URL e la chiave anonima
export const supabase = createClient(
  'https://obxfcvqhhauvqzhezqqw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieGZjdnFoaGF1dnF6aGV6cXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NjQyMDAsImV4cCI6MjAxMTI0MDIwMH0.0EitfYmu0VxXX9hYXr3GU8Muwygf7WG_tbFQYVPWQls'
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
