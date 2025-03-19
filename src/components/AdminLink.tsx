
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function AdminLink() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("User is authenticated:", data.session.user.id);
          setIsAuthenticated(true);
        } else {
          console.log("No active session found");
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
    
    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    <Link 
      to={isAuthenticated ? "/admin/dashboard" : "/admin/login"} 
      className="text-xs text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
      aria-label="Admin login"
    >
      <Lock className="h-3 w-3" />
      <span>{isAuthenticated ? "Admin Dashboard" : "Admin"}</span>
    </Link>
  );
}
