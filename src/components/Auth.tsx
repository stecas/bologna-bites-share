
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Auth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });
      if (error) throw error;
    } catch (error) {
      toast.error("Errore durante il login");
      console.error("Error logging in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logout effettuato con successo");
    } catch (error) {
      toast.error("Errore durante il logout");
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="text-sm text-neutral-dark">
            {user.email}
          </span>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-sm"
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          onClick={handleSignIn}
          variant="outline"
          className="text-sm"
        >
          Login con Google
        </Button>
      )}
    </div>
  );
}
