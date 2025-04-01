
import React from 'react';
import { Twitter, Linkedin, Youtube, ExternalLink } from 'lucide-react';

interface SocialMediaLinksProps {
  links: {
    linkedIn: string;
    twitter: string;
    youtube: string;
    anandCircle: string;
  };
  className?: string;
  iconColor?: string;
  hoverColor?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  links, 
  className = '',
  iconColor = 'text-slate-700',
  hoverColor = 'hover:text-primary'
}) => {
  const iconClasses = `w-5 h-5 ${iconColor} ${hoverColor} transition-colors`;
  
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {links.linkedIn && (
        <a 
          href={links.linkedIn} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:scale-110 transition-transform"
        >
          <Linkedin className={iconClasses} />
        </a>
      )}
      
      {links.twitter && (
        <a 
          href={links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:scale-110 transition-transform"
        >
          <Twitter className={iconClasses} />
        </a>
      )}
      
      {links.youtube && (
        <a 
          href={links.youtube} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:scale-110 transition-transform"
        >
          <Youtube className={iconClasses} />
        </a>
      )}
      
      {links.anandCircle && (
        <a 
          href={links.anandCircle} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Anand Circle"
          className="hover:scale-110 transition-transform"
        >
          <ExternalLink className={iconClasses} />
        </a>
      )}
    </div>
  );
};

export default SocialMediaLinks;
