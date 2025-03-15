
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useAdminAuth = (redirectTo: string = '/admin/login') => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate(redirectTo);
          return;
        }
        
        setIsAuthenticated(true);
        setUserId(session.user.id);
      } catch (error) {
        console.error("Auth error:", error);
        navigate(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
  }, [navigate, redirectTo]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate(redirectTo);
  };

  return {
    isAuthenticated,
    isLoading,
    userId,
    signOut
  };
};
