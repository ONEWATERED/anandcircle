
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FileText, ExternalLink, Download, Save, Printer, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { saveResumeToDatabase } from '@/utils/profileUtils';

interface ResumeSectionProps {
  initialResumeUrl: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ initialResumeUrl }) => {
  const [resumeUrl, setResumeUrl] = useState<string>(initialResumeUrl);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    // Update the state if the prop changes
    if (initialResumeUrl !== resumeUrl) {
      setResumeUrl(initialResumeUrl);
    }
  }, [initialResumeUrl]);

  const handleSaveResumeUrl = async () => {
    if (!resumeUrl) {
      toast.error('Please enter a valid resume URL');
      return;
    }

    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('resumeUrl', resumeUrl);
      
      // Save to database if possible
      const savedToDb = await saveResumeToDatabase(resumeUrl);
      
      if (savedToDb) {
        toast.success('Resume URL saved to database and localStorage');
      } else {
        toast.success('Resume URL saved to localStorage (database connection not available)');
      }
    } catch (error) {
      console.error('Error saving resume URL:', error);
      toast.error('Error saving resume URL');
    } finally {
      setIsSaving(false);
    }
  };

  const openResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else {
      toast.error('Please save a resume URL first');
    }
  };

  const handlePrintResume = () => {
    if (resumeUrl) {
      const printWindow = window.open(resumeUrl, '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      }
    } else {
      toast.error('Please save a resume URL first');
    }
  };

  const handleShareResume = async () => {
    if (!resumeUrl) {
      toast.error('Please save a resume URL first');
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

  const validateUrl = (url: string) => {
    // Basic URL validation
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Resume / CV
        </CardTitle>
        <CardDescription>
          Connect your Gamma-created resume or any online resume to make it accessible from your site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="resumeUrl" className="text-sm font-medium">
            Resume URL
          </label>
          <Input
            id="resumeUrl"
            placeholder="https://gamma.app/your-resume-link"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className={!validateUrl(resumeUrl) ? "border-red-500" : ""}
          />
          {!validateUrl(resumeUrl) && (
            <p className="text-xs text-red-500">
              Please enter a valid URL (e.g., https://gamma.app/your-resume-link)
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the URL where your resume is published (Gamma, Google Docs, Notion, etc.)
          </p>
        </div>
        
        <Button 
          onClick={handleSaveResumeUrl} 
          className="w-full"
          disabled={isSaving || !validateUrl(resumeUrl)}
        >
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Resume URL
            </>
          )}
        </Button>
      </CardContent>
      
      {resumeUrl && (
        <CardFooter className="flex flex-col sm:flex-row gap-3 bg-black/5 rounded-b-lg p-4">
          <Button onClick={openResume} variant="outline" className="w-full sm:w-auto">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Resume
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.open(`${resumeUrl}/pdf`, '_blank')}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={handlePrintResume}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleShareResume}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ResumeSection;
