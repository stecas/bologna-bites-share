
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Gestisce il callback dell'autenticazione
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (session) {
          toast.success("Login effettuato con successo!");
        }

        // Reindirizza alla home page
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Errore durante l'autenticazione:", error);
        toast.error("Errore durante l'autenticazione");
        navigate("/", { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Autenticazione in corso...</div>
    </div>
  );
}
