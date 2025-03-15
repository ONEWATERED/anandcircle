
import React, { useState } from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
  const [open, setOpen] = useState(false);

  // Get resume URL from localStorage
  const getResumeUrl = () => {
    return localStorage.getItem('resumeUrl') || '';
  };

  // Handle external view (opens in new tab)
  const handleExternalView = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={className}
        >
          {showIcon && <FileText className="mr-2 h-4 w-4" />}
          View Resume
          {variant === 'outline' && <ExternalLink className="ml-2 h-4 w-4" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex justify-between items-center">
            <span>Resume / CV</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleExternalView}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in New Tab
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  const resumeUrl = getResumeUrl();
                  if (resumeUrl) window.open(resumeUrl, '_blank', 'download');
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-ratio-box h-[calc(90vh-10rem)] overflow-auto">
          {getResumeUrl() ? (
            <iframe 
              src={getResumeUrl()} 
              className="w-full h-full" 
              title="Resume"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-50">
              <p className="text-center text-muted-foreground">
                No resume URL found. Please add a resume URL on your dashboard.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeButton;
