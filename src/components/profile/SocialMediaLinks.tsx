
import React from 'react';
import { Linkedin, ExternalLink } from 'lucide-react';

interface SocialMediaLinksProps {
  links: {
    linkedIn: string;
    anandCircle: string;
  };
  className?: string;
  iconColor?: string;
  hoverColor?: string;
  linkedInSize?: number;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  links, 
  className = '',
  iconColor = 'text-slate-700',
  hoverColor = 'hover:text-primary',
  linkedInSize = 5
}) => {
  const linkedInClasses = `w-${linkedInSize} h-${linkedInSize} ${iconColor} ${hoverColor} transition-colors`;
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
          <Linkedin className={linkedInClasses} />
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
