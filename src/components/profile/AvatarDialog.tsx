
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
  isAvatarPulsing,
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
          className="absolute -top-3 -right-3 z-30"
          onMouseEnter={handleAvatarHover}
          onMouseLeave={handleAvatarLeave}
        >
          <div className={`neo-glass p-1.5 rounded-full shadow-lg transition-all duration-300 ${isAvatarPulsing ? 'animate-pulse ring-4 ring-primary/60 scale-105' : 'ring-2 ring-primary/40'}`}>
            <Avatar className="h-12 w-12 border-2 border-white/60 bg-primary/10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
                AI
              </AvatarFallback>
            </Avatar>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10"></div>
          </div>
          
          {/* Message indicator */}
          <div className={`absolute -top-1 -right-1 bg-accent rounded-full p-0.5 shadow-md border border-white ${isAvatarPulsing ? 'animate-bounce' : ''}`}>
            <MessageCircle size={14} className="text-white" fill="white" />
          </div>
          
          {/* Enhanced tooltip that appears on hover */}
          {showAvatarHint && (
            <div className="absolute right-0 top-14 glass-card p-3 rounded-xl shadow-lg min-w-56 animate-fade-in z-50">
              <Badge className="bg-primary mb-2">Digital Twin</Badge>
              <p className="text-xs text-foreground/90 mb-1">Chat with my AI-powered digital twin.</p>
              <p className="text-[10px] text-foreground/70 italic">Trained on my knowledge & expertise</p>
            </div>
          )}
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-[#8B5CF6] to-[#6E59A5] text-white shadow-[0_0_30px_rgba(139,92,246,0.5)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Meet My Digital Avatar</DialogTitle>
          <DialogDescription className="text-white/80">
            Connect with my AI-powered digital twin to learn more about my work, interests, and vision.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="neo-glass p-3 rounded-full bg-white/10 backdrop-blur-xl">
            <Avatar className="h-24 w-24 border-2 border-white/60">
              <AvatarFallback className="bg-gradient-to-br from-[#D6BCFA] to-[#9b87f5] text-white text-2xl font-bold">
                AI
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl -z-10"></div>
          </div>
          
          <p className="text-center text-white/90 px-2">
            My digital avatar can answer questions about my experience, projects, and vision for AI and healthcare. It's always learning and improving!
          </p>
          <div className="flex gap-3 mt-2">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={() => setShowAvatarDialog(false)}>
              Maybe Later
            </Button>
            <Button className="bg-white text-[#8B5CF6] hover:bg-white/90 border-0">
              Chat Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialog;
