
import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface ResumeButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  className?: string;
}

const ResumeButton = ({ 
  variant = 'default', 
  size = 'default', 
  showIcon = true,
  className = '' 
}: ResumeButtonProps) => {
  // Get resume URL from localStorage
  const getResumeUrl = () => {
    return localStorage.getItem('resumeUrl') || '';
  };

  const handleViewResume = () => {
    const resumeUrl = getResumeUrl();
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else {
      console.log('No resume URL found');
      // Redirect to a page explaining that the resume will be available soon
      window.location.href = '#story';
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleViewResume}
      className={className}
    >
      {showIcon && <FileText className="mr-2 h-4 w-4" />}
      View Resume
      {variant === 'outline' && <ExternalLink className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default ResumeButton;
