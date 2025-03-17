
import React, { useState } from 'react';
import { FileText, ExternalLink, Download, Printer, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

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

  // Handle print resume
  const handlePrint = () => {
    const resumeUrl = getResumeUrl();
    if (resumeUrl) {
      // Open resume in a new window for printing
      const printWindow = window.open(resumeUrl, '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      }
    } else {
      console.log('No resume URL found');
    }
  };

  // Handle share resume
  const handleShare = async () => {
    const resumeUrl = getResumeUrl();
    if (!resumeUrl) {
      console.log('No resume URL found');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume',
          url: resumeUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copy to clipboard
        copyToClipboard(resumeUrl);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(resumeUrl);
    }
  };

  // Utility to copy URL to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Resume URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy resume URL:', err);
      });
  };

  // Handle download resume
  const handleDownload = () => {
    const resumeUrl = getResumeUrl();
    if (resumeUrl) {
      window.open(`${resumeUrl}/pdf`, '_blank');
    } else {
      console.log('No resume URL found');
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExternalView}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in New Tab
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
