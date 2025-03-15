
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLink() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/.netlify/functions/check-auth');
        const data = await response.json();
        
        if (data?.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error (hidden from user):', error);
      }
    };
    
    checkAuth();
  }, []);
  
  return (
    <Link 
      to="/admin/login" 
      className="text-xs text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
      aria-label="Admin login"
    >
      <Lock className="h-3 w-3" />
      <span>{isAuthenticated ? "Admin Dashboard" : "Admin"}</span>
    </Link>
  );
}
