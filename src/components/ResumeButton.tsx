
import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, Download, Printer, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner';

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
  const [resumeUrl, setResumeUrl] = useState<string>('');

  useEffect(() => {
    // Get resume URL from localStorage when component mounts
    const storedResumeUrl = localStorage.getItem('resumeUrl');
    if (storedResumeUrl) {
      setResumeUrl(storedResumeUrl);
    }
  }, []);

  // Handle external view (opens in new tab)
  const handleExternalView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else {
      toast.error('No resume URL found. Please add a resume URL on your dashboard.');
      // Redirect to a page explaining that the resume will be available soon
      window.location.href = '#story';
    }
  };

  // Handle print resume
  const handlePrint = () => {
    if (resumeUrl) {
      // Open resume in a new window for printing
      const printWindow = window.open(resumeUrl, '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      }
    } else {
      toast.error('No resume URL found. Please add a resume URL on your dashboard.');
    }
  };

  // Handle share resume
  const handleShare = async () => {
    if (!resumeUrl) {
      toast.error('No resume URL found. Please add a resume URL on your dashboard.');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume',
          url: resumeUrl
        });
        toast.success('Resume shared successfully!');
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
        toast.success('Resume URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy resume URL:', err);
        toast.error('Failed to copy URL to clipboard');
      });
  };

  // Handle download resume
  const handleDownload = () => {
    if (resumeUrl) {
      window.open(`${resumeUrl}/pdf`, '_blank');
    } else {
      toast.error('No resume URL found. Please add a resume URL on your dashboard.');
    }
  };

  const noResumePlaceholder = (
    <div className="flex items-center justify-center h-full bg-slate-50">
      <div className="text-center p-6">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-center text-muted-foreground mb-2">
          No resume URL found. Please add a resume URL on your dashboard.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/dashboard'}
          className="mt-2"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );

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
                    disabled={!resumeUrl}
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
          {resumeUrl ? (
            <iframe 
              src={resumeUrl} 
              className="w-full h-full" 
              title="Resume"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            noResumePlaceholder
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeButton;
