
import React from 'react';

const ProfileImage = () => {
  return (
    <div className="relative">
      {/* Main image container with glass effect */}
      <div className="glass-card p-2 rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="aspect-[3/4] rounded-xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Professional photo here</p>
          </div>
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
    </div>
  );
};

export default ProfileImage;
