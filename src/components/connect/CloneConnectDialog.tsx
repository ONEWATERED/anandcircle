
import React from 'react';
import { MessageCircle, ArrowRight, Mic } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CloneConnectDialogProps {
  onOpenDelphi: () => void;
  setDialogOpen: (open: boolean) => void;
}

const CloneConnectDialog: React.FC<CloneConnectDialogProps> = ({ 
  onOpenDelphi, 
  setDialogOpen 
}) => {
  const handleOpenDelphi = () => {
    onOpenDelphi();
    setDialogOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#0EA5E9] to-[#9333EA] text-white border-none">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white">Connect with My Digital Clone</DialogTitle>
        <DialogDescription className="text-white/90">
          Choose how you'd like to interact with my AI assistant
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
          You can have a text chat or voice conversation with my digital clone on Delphi.ai
        </p>
        
        <div className="grid grid-cols-2 gap-3 w-full mt-2">
          <div className="bg-white/10 rounded-lg p-3 text-center cursor-pointer hover:bg-white/20 transition-all" onClick={handleOpenDelphi}>
            <MessageCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm">Text Chat</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center cursor-pointer hover:bg-white/20 transition-all" onClick={handleOpenDelphi}>
            <Mic className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm">Voice Conversation</p>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4 bg-white text-primary hover:bg-white/90 flex items-center justify-center"
          onClick={handleOpenDelphi}
        >
          Connect Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </DialogContent>
  );
};

export default CloneConnectDialog;
