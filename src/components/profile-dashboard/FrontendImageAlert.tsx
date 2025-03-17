
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface FrontendImageAlertProps {
  frontendImageUrl: string | null;
}

const FrontendImageAlert: React.FC<FrontendImageAlertProps> = ({ frontendImageUrl }) => {
  if (!frontendImageUrl) return null;
  
  return (
    <Alert className="bg-muted">
      <Info className="h-4 w-4" />
      <AlertTitle>Current Frontend Image</AlertTitle>
      <AlertDescription className="flex items-center mt-2">
        <div className="mr-4">
          <p className="text-sm text-muted-foreground mb-1">
            This is the image currently displayed on your public site:
          </p>
          <img 
            src={frontendImageUrl} 
            alt="Current frontend profile" 
            className="w-24 h-24 object-cover rounded-md border" 
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p>To update this image, upload a new one below and click "Sync to Frontend".</p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default FrontendImageAlert;
