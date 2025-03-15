
import React, { useEffect, useState } from 'react';
import { Linkedin, Twitter, Users, Youtube, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProfileImage } from '@/utils/imageLoader';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');

  useEffect(() => {
    // Load profile image from localStorage if available (for user customization)
    const savedImage = getProfileImage();
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  return (
    <div className="relative">
      {/* Main image container with glass effect */}
      <div className="glass-card p-2 rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="aspect-[3/4] rounded-xl overflow-hidden">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Hardeep Anand" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Professional photo here</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-full blur-xl z-0"></div>
      <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-400/30 rounded-full blur-xl z-0"></div>
      
      {/* Professional tag */}
      <div className="absolute -bottom-4 right-8 glass-card p-2 rounded-full shadow-lg z-20">
        <div className="flex items-center space-x-2 px-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          <span className="text-sm font-medium text-gray-700">Executive & Innovator</span>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
        <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
           className="glass-card p-2 rounded-full hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
          <Linkedin size={18} className="text-primary" />
        </a>
        <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
           className="glass-card p-2 rounded-full hover:bg-blue-400/10 transition-colors" aria-label="Twitter">
          <Twitter size={18} className="text-blue-400" />
        </a>
        <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
           className="glass-card p-2 rounded-full hover:bg-red-500/10 transition-colors" aria-label="YouTube">
          <Youtube size={18} className="text-red-500" />
        </a>
        <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
           className="glass-card p-2 rounded-full hover:bg-green-500/10 transition-colors" aria-label="Spotify">
          <Music size={18} className="text-green-500" />
        </a>
        <Link to="#anand-circle"
              className="glass-card p-2 rounded-full hover:bg-accent/10 transition-colors" aria-label="ANAND Circle">
          <Users size={18} className="text-accent" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileImage;
