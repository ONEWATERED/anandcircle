
import React from 'react';
import { Linkedin, Twitter, Users, Youtube, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import useIsMobile from '@/hooks/use-mobile';
import { ensureHttpProtocol } from '@/utils/databaseConnection';

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
  
  // Ensure all URLs have proper protocol
  const safeLinks = {
    linkedIn: ensureHttpProtocol(links.linkedIn),
    twitter: ensureHttpProtocol(links.twitter),
    youtube: ensureHttpProtocol(links.youtube),
    spotify: ensureHttpProtocol(links.spotify),
    anandCircle: links.anandCircle // Keep as is since it could be an internal route
  };
  
  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    // Make sure internal links work with React Router and external links open in a new tab
    if (url.startsWith('#') || url.startsWith('/')) {
      // Don't prevent default for internal links - let React Router handle it
    } else if (url) {
      // For external links, open in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
      e.preventDefault();
    }
  };
  
  // On mobile, display the social links horizontally at the bottom
  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row gap-2 z-30">
        <a href={safeLinks.linkedIn} target="_blank" rel="noopener noreferrer" 
           className="glass-card p-2 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-primary/20" 
           aria-label="LinkedIn"
           onClick={(e) => handleLinkClick(safeLinks.linkedIn, e)}>
          <Linkedin size={16} className="text-primary" />
        </a>
        <a href={safeLinks.twitter} target="_blank" rel="noopener noreferrer"
           className="glass-card p-2 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-blue-400/20" 
           aria-label="Twitter"
           onClick={(e) => handleLinkClick(safeLinks.twitter, e)}>
          <Twitter size={16} className="text-blue-400" />
        </a>
        <a href={safeLinks.youtube} target="_blank" rel="noopener noreferrer"
           className="glass-card p-2 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-red-500/20" 
           aria-label="YouTube"
           onClick={(e) => handleLinkClick(safeLinks.youtube, e)}>
          <Youtube size={16} className="text-red-500" />
        </a>
        <a href={safeLinks.spotify} target="_blank" rel="noopener noreferrer"
           className="glass-card p-2 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-green-500/20" 
           aria-label="Spotify"
           onClick={(e) => handleLinkClick(safeLinks.spotify, e)}>
          <Music size={16} className="text-green-500" />
        </a>
        {safeLinks.anandCircle.startsWith('/') || safeLinks.anandCircle.startsWith('#') ? (
          <Link to={safeLinks.anandCircle}
                className="glass-card p-2 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-accent/20" 
                aria-label="ANAND Circle">
            <Users size={16} className="text-accent" />
          </Link>
        ) : (
          <a href={safeLinks.anandCircle} target="_blank" rel="noopener noreferrer"
             className="glass-card p-2 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-110 border-2 border-accent/20" 
             aria-label="ANAND Circle"
             onClick={(e) => handleLinkClick(safeLinks.anandCircle, e)}>
            <Users size={16} className="text-accent" />
          </a>
        )}
      </div>
    );
  }
  
  // On desktop, maintain the original vertical layout on the left side
  return (
    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-7 z-20">
      <a href={safeLinks.linkedIn} target="_blank" rel="noopener noreferrer" 
         className="glass-card p-4 rounded-full hover:bg-primary/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="LinkedIn"
         onClick={(e) => handleLinkClick(safeLinks.linkedIn, e)}>
        <Linkedin size={30} className="text-primary" />
      </a>
      <a href={safeLinks.twitter} target="_blank" rel="noopener noreferrer"
         className="glass-card p-4 rounded-full hover:bg-blue-400/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="Twitter"
         onClick={(e) => handleLinkClick(safeLinks.twitter, e)}>
        <Twitter size={30} className="text-blue-400" />
      </a>
      <a href={safeLinks.youtube} target="_blank" rel="noopener noreferrer"
         className="glass-card p-4 rounded-full hover:bg-red-500/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="YouTube"
         onClick={(e) => handleLinkClick(safeLinks.youtube, e)}>
        <Youtube size={30} className="text-red-500" />
      </a>
      <a href={safeLinks.spotify} target="_blank" rel="noopener noreferrer"
         className="glass-card p-4 rounded-full hover:bg-green-500/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
         aria-label="Spotify"
         onClick={(e) => handleLinkClick(safeLinks.spotify, e)}>
        <Music size={30} className="text-green-500" />
      </a>
      {safeLinks.anandCircle.startsWith('/') || safeLinks.anandCircle.startsWith('#') ? (
        <Link to={safeLinks.anandCircle}
              className="glass-card p-4 rounded-full hover:bg-accent/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
              aria-label="ANAND Circle">
          <Users size={30} className="text-accent" />
        </Link>
      ) : (
        <a href={safeLinks.anandCircle} target="_blank" rel="noopener noreferrer"
           className="glass-card p-4 rounded-full hover:bg-accent/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:translate-x-1" 
           aria-label="ANAND Circle"
           onClick={(e) => handleLinkClick(safeLinks.anandCircle, e)}>
          <Users size={30} className="text-accent" />
        </a>
      )}
    </div>
  );
};

export default SocialMediaLinks;
