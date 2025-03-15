
import React from 'react';
import { Linkedin, Twitter, Users, Youtube, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

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
