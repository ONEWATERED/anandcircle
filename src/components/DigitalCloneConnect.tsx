
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CloneConnectDialog from './connect/CloneConnectDialog';
import DomainSection from './connect/DomainSection';

const DigitalCloneConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleOpenDelphi = () => {
    window.open('https://www.delphi.ai/hardeepanand', '_blank', 'noopener,noreferrer');
    setDialogOpen(false);
  };
  
  return (
    <section id="digital-avatar" className="py-16 md:py-24 bg-tech-dark border-t border-[#0EA5E9]/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#0EA5E9] rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9333EA] rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] font-medium border border-[#0EA5E9]/20">
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Let's Connect</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Have a Conversation <span className="text-gradient-cyan-purple">With Me</span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Connect with my digital clone on Delphi.ai where you can choose to have a text chat or a voice 
            conversation. My AI can answer questions about my work, ideas, and experiences instantly.
          </p>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div 
            className="relative cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            onClick={() => setDialogOpen(true)}
          >
            <div className="bg-white p-1 rounded-full">
              <Avatar className="h-24 w-24 bg-primary/10">
                <AvatarFallback className="bg-primary text-white text-xl">
                  AI
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="absolute -top-2 -right-2 bg-accent rounded-full p-1 border border-white">
              <MessageCircle size={20} className="text-white" fill="white" />
            </div>
          </motion.div>
        </div>
        
        {/* Dialog that opens instead of navigating away */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div className="hidden">Trigger</div>
          </DialogTrigger>
          <CloneConnectDialog 
            onOpenDelphi={handleOpenDelphi} 
            setDialogOpen={setDialogOpen} 
          />
        </Dialog>
        
        {/* Single button that opens the dialog */}
        <motion.div 
          className="text-center mt-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            variant="default"
            onClick={() => setDialogOpen(true)}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white shadow-neon-purple hover:shadow-neon-cyan hover:opacity-90 cursor-pointer transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat or Talk with My Digital Clone
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Domain expertise cards */}
        <DomainSection onCardClick={() => setDialogOpen(true)} />
      </div>
    </section>
  );
};

export default DigitalCloneConnect;
