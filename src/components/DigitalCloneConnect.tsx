
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Phone } from 'lucide-react';
import AvatarDialog from '@/components/profile/AvatarDialog';
import { domains } from '@/data/domainData';

const DigitalCloneConnect = () => {
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true);
  
  // Reordering the domains according to the specified order
  const orderedDomains = [
    domains.find(d => d.id === 'water'),     // 1. One Water
    domains.find(d => d.id === 'ai'),        // 2. AI
    domains.find(d => d.id === 'data'),      // 3. Data
    domains.find(d => d.id === 'mentoring'), // 4. Mentoring
    domains.find(d => d.id === 'family'),    // 5. Nuclear Family
    domains.find(d => d.id === 'health'),    // 6. Health
  ].filter(Boolean); // Filter out any undefined values
  
  const handleAvatarHover = () => {
    setShowAvatarHint(true);
    setIsAvatarPulsing(false);
  };
  
  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
    setIsAvatarPulsing(true);
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
            Connect with me directly or chat with my AI avatar. My AI can answer questions about my work, 
            ideas, and experiences instantly, or we can schedule a personal conversation.
          </p>
        </motion.div>
        
        <div className="flex justify-center">
          <AvatarDialog 
            showAvatarHint={showAvatarHint}
            showAvatarDialog={showAvatarDialog}
            setShowAvatarDialog={setShowAvatarDialog}
            handleAvatarHover={handleAvatarHover}
            handleAvatarLeave={handleAvatarLeave}
            isAvatarPulsing={isAvatarPulsing}
          />
          
          <motion.div 
            className="relative cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            onClick={() => setShowAvatarDialog(true)}
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
        
        {/* Updated buttons to clarify interaction options */}
        <motion.div 
          className="text-center mt-8 flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            variant="default"
            onClick={() => setShowAvatarDialog(true)}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white shadow-neon-purple hover:shadow-neon-cyan hover:opacity-90 cursor-pointer transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with My AI Avatar Now
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => window.open('mailto:hardeepanand@email.com', '_blank')}
            className="border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all duration-300"
          >
            <Phone className="mr-2 h-5 w-5" />
            Schedule a Direct Conversation
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
            My Areas of <span className="text-gradient-cyan-purple">Expertise</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {orderedDomains.map((domain) => {
              const Icon = domain.icon;
              const pastelColors = {
                'water': '#D3E4FD', // soft blue
                'ai': '#E5DEFF',    // soft purple
                'data': '#E5DEFF',  // soft purple (matching AI for now)
                'mentoring': '#FDE1D3', // soft peach
                'family': '#FFDEE2',  // soft pink
                'health': '#D3FDDF',  // soft mint
              };
              const bgColor = pastelColors[domain.id] || '#F1F0FB'; // default soft gray
              
              return (
                <motion.div 
                  key={domain.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 w-40 md:w-48 cursor-pointer"
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setShowAvatarDialog(true)}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${domain.color}30` }}
                  >
                    <Icon size={24} color={domain.color} />
                  </div>
                  
                  <h4 className="text-base font-medium mb-1 text-white">{domain.title}</h4>
                  
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {domain.description}
                  </p>
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

