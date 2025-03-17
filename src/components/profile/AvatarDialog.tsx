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
          {/* Neural connection path with "Chat with me" text */}
          <div className="absolute top-12 right-6 w-40 h-20 overflow-visible pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 120 80" className="absolute">
              {/* Main connection path */}
              <path 
                d="M20,60 C40,50 80,40 100,20" 
                fill="none" 
                stroke="url(#gradient-path)" 
                strokeWidth="3" 
                strokeDasharray="5,3"
                className="animate-pulse" 
              />
              
              {/* Arrow at the end of the path */}
              <polygon 
                points="100,20 94,26 97,19 91,16" 
                fill="url(#gradient-path)" 
                className="animate-pulse"
              />
              
              {/* Text label - positioned above the line */}
              <text 
                x="50" 
                y="35" 
                className="fill-primary font-medium text-sm"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Chat with me
              </text>
              
              <defs>
                <linearGradient id="gradient-path" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Animated particles traveling along the path */}
            <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-primary/60 blur-sm animate-[neural-particle-1_3s_infinite]"></div>
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-accent/60 blur-sm animate-[neural-particle-2_4s_infinite_0.5s]"></div>
          </div>
          
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
          
          {/* Connection visualization within the dialog too - simplified to one line */}
          <div className="relative py-2">
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-white/80 to-white/20"></div>
            <div className="absolute left-[calc(50%-4px)] top-0 w-2 h-2 rounded-full bg-white animate-ping"></div>
            <div className="absolute left-[calc(50%-4px)] bottom-0 w-2 h-2 rounded-full bg-white"></div>
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
