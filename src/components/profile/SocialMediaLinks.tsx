
import React from 'react';
import { Linkedin, Twitter, Users, Youtube, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import useIsMobile from '@/hooks/use-mobile';

interface SocialMediaLinksProps {
  links: {
    linkedIn: string;
    twitter: string;
    youtube: string;
    spotify: string;
    anandCircle: string;
  };
}

const SocialMediaLinks = ({ links }: SocialMediaLinksProps) => {
  const isMobile = useIsMobile();
  
  // On mobile, display the social links horizontally at the bottom
  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row gap-3 z-30">
        <a href={links.linkedIn} target="_blank" rel="noopener noreferrer" 
           className="glass-card p-2.5 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-primary/20" 
           aria-label="LinkedIn">
          <Linkedin size={20} className="text-primary" />
        </a>
        <a href={links.twitter} target="_blank" rel="noopener noreferrer"
           className="glass-card p-2.5 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-blue-400/20" 
           aria-label="Twitter">
          <Twitter size={20} className="text-blue-400" />
        </a>
        <a href={links.youtube} target="_blank" rel="noopener noreferrer"
           className="glass-card p-2.5 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-red-500/20" 
           aria-label="YouTube">
          <Youtube size={20} className="text-red-500" />
        </a>
        <a href={links.spotify} target="_blank" rel="noopener noreferrer"
           className="glass-card p-2.5 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-green-500/20" 
           aria-label="Spotify">
          <Music size={20} className="text-green-500" />
        </a>
        <Link to={links.anandCircle}
              className="glass-card p-2.5 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-accent/20" 
              aria-label="ANAND Circle">
          <Users size={20} className="text-accent" />
        </Link>
      </div>
    );
  }
  
  // On desktop, maintain the original vertical layout on the left side
  return (
    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-7 z-20">
      <a href={links.linkedIn} target="_blank" rel="noopener noreferrer" 
         className="glass-card p-4 rounded-full hover:bg-primary/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="LinkedIn">
        <Linkedin size={30} className="text-primary" />
      </a>
      <a href={links.twitter} target="_blank" rel="noopener noreferrer"
         className="glass-card p-4 rounded-full hover:bg-blue-400/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="Twitter">
        <Twitter size={30} className="text-blue-400" />
      </a>
      <a href={links.youtube} target="_blank" rel="noopener noreferrer"
         className="glass-card p-4 rounded-full hover:bg-red-500/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="YouTube">
        <Youtube size={30} className="text-red-500" />
      </a>
      <a href={links.spotify} target="_blank" rel="noopener noreferrer"
         className="glass-card p-4 rounded-full hover:bg-green-500/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="Spotify">
        <Music size={30} className="text-green-500" />
      </a>
      <Link to={links.anandCircle}
            className="glass-card p-4 rounded-full hover:bg-accent/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
            aria-label="ANAND Circle">
        <Users size={30} className="text-accent" />
      </Link>
    </div>
  );
};

export default SocialMediaLinks;
