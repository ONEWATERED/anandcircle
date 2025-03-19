
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLink() {
  return (
    <Link 
      to="/"
      className="text-xs text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
      aria-label="Home"
    >
      <Lock className="h-3 w-3" />
      <span>Home</span>
    </Link>
  );
}
