
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  HeartPulse, 
  Droplet, 
  Brain, 
  GraduationCap,
  ExternalLink,
  X,
  ChevronDown,
  Bot,
  ArrowUpRight,
  Sparkles,
  UserRound,
  CreditCard,
  MessageSquare,
  PhoneCall,
  Blocks
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { domains } from '@/data/domainData';
import { useIsMobile } from '@/hooks/use-mobile';

const DigitalCloneConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  // Add Blockchain domain if it's not already in the domains list
  const allDomains = [...domains];
  const hasBlockchainDomain = domains.some(domain => domain.id === 'blockchain');
  
  if (!hasBlockchainDomain) {
    allDomains.push({
      id: 'blockchain',
      title: 'Blockchain',
      description: 'Digital ledger technologies, decentralized applications, and innovations in Web3 and cryptocurrency ecosystems.',
      icon: Blocks,
      color: '#10B981', // Using the same green color as in the header
      initialAngle: 270 // Adding the required initialAngle property
    });
  }

  const handleConnectClick = (domainId: string) => {
    setSelectedDomain(domainId);
    setDialogOpen(true);
  };

  // External direct link to Delphi
  const delphiBaseUrl = "https://www.delphi.ai/hardeepanand";
  const domainUrl = selectedDomain ? `${delphiBaseUrl}?domain=${selectedDomain}` : delphiBaseUrl;
  const domain = selectedDomain ? allDomains.find(d => d.id === selectedDomain) : null;

  return (
    <section id="digital-avatar" className="py-16 md:py-24 bg-gradient-to-b from-tech-dark to-tech-dark/90 border-t border-[#0EA5E9]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-[#0EA5E9] uppercase mb-3">Let's Connect</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Chat With My Digital Twin</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] mx-auto rounded-full my-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Hey there! I've created a virtual version of myself that you can chat with anytime. 
            Ask me anything about my work with water sustainability, AI, healthcare, or just about life in general!
          </p>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => handleConnectClick('general')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white font-medium rounded-xl px-8 py-6 text-lg shadow-neon-purple hover:scale-105 transition-all duration-300 group"
              size="lg"
            >
              <Bot className="h-6 w-6 mr-3" />
              <span>Say Hi to My Digital Twin</span>
              <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:translate-y-[-4px] transition-transform" />
            </Button>
            
            <Link to="/create-your-own">
              <Button
                variant="outline"
                className="border-[#0EA5E9] text-white bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/30 shadow-neon-cyan transition-all duration-300 px-8 py-6 text-lg rounded-xl group"
                size="lg"
              >
                <UserRound className="h-6 w-6 mr-3" />
                <span>Create Your Own Twin</span>
                <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:translate-y-[-4px] transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Domain topics showcase with improved styling */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="glass-card bg-black/30 border border-[#0EA5E9]/40 rounded-2xl p-6 shadow-neon-cyan">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0EA5E9]" />
                <h4 className="text-xl font-semibold text-white">What I Love Talking About</h4>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-[#0EA5E9]/40 text-white bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/30 shadow-neon-cyan transition-all duration-300"
              >
                {isExpanded ? 'Show Less' : 'See All Topics'}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Grid display for domains with improved design */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isExpanded ? '' : 'md:grid-rows-1 overflow-hidden'}`}>
              {allDomains.slice(0, isExpanded ? allDomains.length : 3).map((domain, index) => {
                const Icon = domain.icon;
                
                return (
                  <motion.div
                    key={domain.id}
                    className="relative overflow-hidden rounded-xl border border-[#0EA5E9]/40 hover:border-[#0EA5E9] transition-all cursor-pointer bg-gradient-to-br from-[#0F172A]/80 to-[#0B1121] hover:from-[#0F172A]/90 hover:to-[#0B1121]/80 shadow-neon-cyan hover:shadow-lg hover:scale-105 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={() => handleConnectClick(domain.id)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Glow effect in the background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/0 via-[#0EA5E9]/5 to-[#0EA5E9]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Card content */}
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mr-3 bg-gradient-to-br from-[#0EA5E9]/20 to-[#9333EA]/20 border border-[#0EA5E9]/40 shadow-neon-cyan">
                          <Icon size={20} style={{ color: domain.color }} className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h5 className="font-medium text-[#0EA5E9] text-lg">{domain.title}</h5>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-2 min-h-[48px]">
                        {domain.description}
                      </p>
                      <Button variant="default" size={isMobile ? "sm" : "default"} className="w-full justify-between mt-2 bg-gradient-to-r from-[#0EA5E9]/20 to-[#9333EA]/20 hover:from-[#0EA5E9]/40 hover:to-[#9333EA]/40 text-white border border-[#0EA5E9]/30 group-hover:border-[#0EA5E9]/60 shadow-neon-cyan group-hover:shadow-neon-purple transition-all duration-300">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <PhoneCall className="h-4 w-4 mr-2" />
                          <span>Connect</span>
                        </div>
                        <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                      </Button>
                    </div>
                    
                    {/* Decorative scanning line effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-30 pointer-events-none">
                      <div className="absolute w-full h-[2px] bg-[#0EA5E9]/60 top-0 left-0 animate-scanning-line"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Create Your Own Digital Experience CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-5xl mx-auto mt-16 p-8 rounded-2xl border border-[#0EA5E9]/40 shadow-neon-cyan bg-gradient-to-r from-[#0F172A] to-[#0B1121]"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-3/5">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">Want Your Own Digital Twin?</h4>
              <p className="text-gray-300 mb-6">
                I'd love to help you create your own AI twin! It's a great way to connect with your audience.
                Plus, I donate all proceeds to the One Water Foundation supporting global water solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30">
                  <Bot className="h-5 w-5 text-[#0EA5E9] mr-2" />
                  <span className="text-white font-medium">24/7 Conversations</span>
                </div>
                <div className="flex items-center px-4 py-2 rounded-full bg-[#9333EA]/10 border border-[#9333EA]/30">
                  <Droplet className="h-5 w-5 text-cyan-500 mr-2" />
                  <span className="text-white font-medium">Support Clean Water</span>
                </div>
                <div className="flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/30">
                  <CreditCard className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">Affordable Options</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/5 space-y-4">
              <Link to="/create-your-own" className="block w-full">
                <Button className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white py-6 rounded-xl shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 text-lg hover:scale-105">
                  <Bot className="mr-2 h-5 w-5" />
                  Let's Create Your Twin
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-center text-gray-400">Starting at just $500</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Avatar Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-4xl h-[80vh] p-0 bg-black/90 border-[#0EA5E9]/40 shadow-neon-cyan">
          <DialogHeader className="p-6 border-b border-[#0EA5E9]/20 flex-row justify-between items-start bg-gradient-to-r from-[#0EA5E9]/10 to-[#9333EA]/10">
            <div>
              <DialogTitle className="text-xl mb-2 text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#0EA5E9]/20 to-[#9333EA]/20 border border-[#0EA5E9]/40">
                  {domain?.icon && <domain.icon size={16} style={{ color: domain?.color || '#0EA5E9' }} />}
                  {!domain?.icon && <Bot size={16} className="text-[#0EA5E9]" />}
                </div>
                <span>Chatting about {domain?.title || 'Everything'}</span>
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {domain ? domain.description : "Hey there! I'm Hardeep's digital twin. What would you like to talk about today?"}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)} className="h-8 w-8 text-white hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="h-full">
            <iframe 
              src={domainUrl}
              className="w-full h-full border-0" 
              title="Digital Avatar"
              allow="microphone"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DigitalCloneConnect;
