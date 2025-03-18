
import React from 'react';
import { MessageCircle } from 'lucide-react';
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
              <Badge className="bg-primary mb-1">Digital Twin</Badge>
              <p className="text-xs text-foreground/90 mb-1">Chat with my AI-powered digital twin.</p>
              <p className="text-[10px] text-foreground/70">Trained on my knowledge & expertise</p>
            </div>
          )}
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-primary text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white">Meet My Digital Avatar</DialogTitle>
          <DialogDescription className="text-white/80">
            Connect with my AI-powered digital twin to learn more about my work.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white/10 p-2 rounded-full">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-white/20 text-white text-xl">
                AI
              </AvatarFallback>
            </Avatar>
          </div>
          
          <p className="text-center text-white/90 px-2">
            My digital avatar can answer questions about my experience, projects, and vision for AI and healthcare.
          </p>
          <div className="flex gap-3 mt-2">
            <Button variant="secondary" className="bg-white/20 text-white" onClick={() => setShowAvatarDialog(false)}>
              Maybe Later
            </Button>
            <Button className="bg-white text-primary">
              Chat Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialog;
