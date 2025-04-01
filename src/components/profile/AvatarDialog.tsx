
import React from 'react';
import { MessageCircle, MessageSquare, ArrowRight } from 'lucide-react';
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
              <p className="text-xs text-foreground/90 mb-1">Have a conversation with me!</p>
              <p className="text-[10px] text-foreground/70">Ask me anything about my work</p>
            </div>
          )}
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#0EA5E9] to-[#9333EA] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Let's Have a Conversation</DialogTitle>
          <DialogDescription className="text-white/90">
            I'm here to chat with you about my work, ideas, and experiences
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
            Hi there! I'm excited to chat with you. What would you like to know about my work in water, AI, health, or anything else?
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full mt-2">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <MessageSquare className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Ask about my projects</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <MessageCircle className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Discuss industry trends</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 w-full">
            <Button 
              variant="secondary" 
              className="bg-white/20 text-white hover:bg-white/30 flex-1" 
              onClick={() => setShowAvatarDialog(false)}
            >
              Maybe Later
            </Button>
            <Button 
              className="bg-white text-primary hover:bg-white/90 flex-1 flex items-center justify-center"
              onClick={handleChatNow}
            >
              Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialog;
