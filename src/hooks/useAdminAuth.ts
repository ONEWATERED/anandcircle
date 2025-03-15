
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAdminAuth = (redirectTo: string = '/admin/login') => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No active session found, redirecting to login");
          navigate(redirectTo);
          return;
        }
        
        console.log("Active session found for user:", session.user.id);
        setIsAuthenticated(true);
        setUserId(session.user.id);
      } catch (error) {
        console.error("Auth error:", error);
        toast({
          title: "Authentication Error",
          description: "Please log in again to continue",
          variant: "destructive"
        });
        navigate(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          setUserId(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUserId(null);
          navigate(redirectTo);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, redirectTo, toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out"
      });
      navigate(redirectTo);
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out",
        variant: "destructive"
      });
    }
  };

  return {
    isAuthenticated,
    isLoading,
    userId,
    signOut
  };
};
