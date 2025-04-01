
import React from 'react';
import { MessageCircle, MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AvatarDialogProps {
  isAvatarPulsing: boolean;
  showAvatarHint: boolean;
  showAvatarDialog: boolean;
  setShowAvatarDialog: (show: boolean) => void;
  handleAvatarHover: () => void;
  handleAvatarLeave: () => void;
}

const AvatarDialog = ({
  showAvatarHint,
  showAvatarDialog,
  setShowAvatarDialog,
  handleAvatarHover,
  handleAvatarLeave
}: AvatarDialogProps) => {
  const handleChatNow = () => {
    // Open the Delphi chat in a new tab
    window.open('https://www.delphi.co', '_blank', 'noopener,noreferrer');
    setShowAvatarDialog(false);
  };

  const handleScheduleCall = () => {
    // Open email client to schedule a direct conversation
    window.open('mailto:hardeepanand@email.com', '_blank');
    setShowAvatarDialog(false);
  };
  
  return (
    <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
      <DialogTrigger asChild>
        <Link 
          to="#"
          className="hidden md:block absolute top-4 right-4 z-10"
          onMouseEnter={handleAvatarHover}
          onMouseLeave={handleAvatarLeave}
        >
          <div className="bg-white p-1 rounded-full">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback className="bg-primary text-white text-xs">
                AI
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="absolute -top-1 -right-1 bg-accent rounded-full p-0.5 border border-white">
            <MessageCircle size={12} className="text-white" fill="white" />
          </div>
          
          {showAvatarHint && (
            <div className="absolute right-0 top-10 bg-white p-2 rounded-lg shadow-sm min-w-48 z-50 border border-gray-100">
              <Badge className="bg-primary mb-1">Let's Chat</Badge>
              <p className="text-xs text-foreground/90 mb-1">Chat with my AI avatar!</p>
              <p className="text-[10px] text-foreground/70">Or schedule a direct conversation</p>
            </div>
          )}
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#0EA5E9] to-[#9333EA] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Choose How to Connect</DialogTitle>
          <DialogDescription className="text-white/90">
            Chat with my AI avatar instantly or schedule a direct conversation with me
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-white/30 text-white text-2xl font-bold">
                HA
              </AvatarFallback>
            </Avatar>
          </div>
          
          <p className="text-center text-white px-4 text-lg">
            You can choose to chat with my AI avatar right now or schedule a direct conversation with me personally.
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full mt-2">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <MessageCircle className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">AI Chat (Instant)</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Phone className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Direct Call (Scheduled)</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
            <Button 
              variant="secondary" 
              className="bg-white/20 text-white hover:bg-white/30" 
              onClick={() => setShowAvatarDialog(false)}
            >
              Maybe Later
            </Button>
            <Button 
              className="bg-white text-primary hover:bg-white/90 flex items-center justify-center"
              onClick={handleChatNow}
            >
              Chat with AI Avatar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/20 flex items-center justify-center"
              onClick={handleScheduleCall}
            >
              Schedule Direct Call <Phone className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialog;

