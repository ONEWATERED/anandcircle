
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, ArrowRight, Mic } from 'lucide-react';
import { domains } from '@/data/domainData';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const DigitalCloneConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Reordering and grouping the domains
  const groupedDomains = [
    // Group 1: AI & Data
    {
      id: 'tech',
      domains: [
        domains.find(d => d.id === 'ai'),        // AI
        domains.find(d => d.id === 'data'),      // Data
      ].filter(Boolean)
    },
    // Group 2: One Water
    {
      id: 'water',
      domains: [
        domains.find(d => d.id === 'water'),     // One Water
      ].filter(Boolean)
    },
    // Group 3: Mentoring & Family
    {
      id: 'people',
      domains: [
        domains.find(d => d.id === 'mentoring'), // Mentoring
        domains.find(d => d.id === 'family'),    // Nuclear Family
      ].filter(Boolean)
    },
    // Group 4: Health
    {
      id: 'health',
      domains: [
        domains.find(d => d.id === 'health'),    // Health
      ].filter(Boolean)
    }
  ];
  
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

        {/* Domain expertise cards - updated to be more friendly and approachable */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-medium text-center mb-8 text-white">
            What I'm <span className="text-gradient-cyan-purple">Passionate About</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto max-w-5xl">
            {groupedDomains.map((group) => {
              return (
                <motion.div 
                  key={group.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setDialogOpen(true)}
                >
                  <div className="flex flex-col h-full">
                    {group.domains.map((domain, index) => {
                      if (!domain) return null;
                      const Icon = domain.icon;
                      
                      return (
                        <div key={domain.id} className={`${index > 0 ? 'mt-4 pt-4 border-t border-white/10' : ''}`}>
                          <div className="flex items-center mb-2">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                              style={{ backgroundColor: `${domain.color}30` }}
                            >
                              <Icon size={16} color={domain.color} />
                            </div>
                            <h4 className="text-base font-medium text-white">{domain.title}</h4>
                          </div>
                          
                          <p className="text-xs text-gray-300">
                            {domain.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalCloneConnect;
