
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, MessageCircle, Mic } from 'lucide-react';
import ResumeButton from '@/components/ResumeButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ProfileHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleOpenDelphi = () => {
    window.open('https://www.delphi.ai/hardeepanand', '_blank', 'noopener,noreferrer');
    setDialogOpen(false);
  };
  
  return (
    <motion.div 
      className="w-full max-w-3xl space-y-6 md:space-y-8 text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white text-gradient-tech">
        Hardeep Anand
      </h1>
      
      <h2 className="text-sm md:text-lg font-medium tracking-tight text-gray-300 flex flex-wrap justify-center gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0EA5E9]/10 text-[#0EA5E9]">One Water</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#9333EA]/10 text-[#9333EA]">AI</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#06B6D4]/10 text-[#06B6D4]">Data</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981]">Blockchain</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DB2777]/10 text-[#DB2777]">Community</span>
      </h2>
      
      <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
        Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
        health challenges, and community needs.
      </p>
      
      <motion.div 
        className="flex flex-wrap gap-4 pt-6 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button 
          size={isMobile ? "default" : "lg"} 
          variant="default"
          className="bg-gradient-tech text-white font-medium rounded-xl shadow-neon-cyan hover:shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => {
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <BookOpen className="mr-2 h-5 w-5" />
          My Story
        </Button>
        
        <ResumeButton 
          size={isMobile ? "default" : "lg"}
          className="bg-gradient-magenta-gold text-white font-medium rounded-xl shadow-neon-magenta hover:shadow-lg hover:scale-105 transition-all duration-300"
        />
      </motion.div>
      
      {/* Dialog that opens instead of navigating away */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
      </Dialog>
      
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button 
          size={isMobile ? "default" : "lg"} 
          variant="default"
          onClick={() => setDialogOpen(true)}
          className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white font-medium shadow-neon-purple rounded-xl px-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          <span>Connect With Me</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileHeader;
