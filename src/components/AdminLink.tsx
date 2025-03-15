
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLink() {
  const [showLink, setShowLink] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const targetSequence = ['a', 'd', 'm', 'i', 'n'];
  
  // Listen for key presses to reveal admin link
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only track lowercase a-z keys
      if (e.key.length === 1 && /[a-z]/.test(e.key)) {
        const newSequence = [...keySequence, e.key].slice(-targetSequence.length);
        setKeySequence(newSequence);
        
        // Check if sequence matches target
        const sequenceMatches = newSequence.length === targetSequence.length && 
          newSequence.every((key, i) => key === targetSequence[i]);
          
        if (sequenceMatches) {
          console.log('Admin sequence detected!');
          setShowLink(true);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]); // Add keySequence as a dependency
  
  // Also check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/.netlify/functions/check-auth');
        const data = await response.json();
        
        if (data?.authenticated) {
          setShowLink(true);
        }
      } catch (error) {
        // Silently fail - we don't want to reveal admin link
        console.error('Auth check error (hidden from user):', error);
      }
    };
    
    checkAuth();
  }, []);
  
  if (!showLink) return null;
  
  return (
    <Link 
      to="/admin/login" 
      className="text-xs text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
      aria-label="Admin login"
    >
      <Lock className="h-3 w-3" />
      <span>Admin</span>
    </Link>
  );
}
