
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  HeartPulse, 
  Droplet, 
  Brain, 
  GraduationCap,
  ExternalLink,
  X,
  ChevronDown,
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { domains } from '@/data/domainData';

const DigitalCloneConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleConnectClick = (domainId: string) => {
    setSelectedDomain(domainId);
    setDialogOpen(true);
  };

  // External direct link to Delphi
  const delphiBaseUrl = "https://www.delphi.ai/hardeepanand";
  const domainUrl = selectedDomain ? `${delphiBaseUrl}?domain=${selectedDomain}` : delphiBaseUrl;
  const domain = selectedDomain ? domains.find(d => d.id === selectedDomain) : null;

  return (
    <section id="digital-avatar" className="py-16 md:py-24 bg-gradient-to-b from-tech-dark to-tech-dark/90 border-t border-[#0EA5E9]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-[#0EA5E9] uppercase mb-3">My Digital Twin</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Chat with My AI Avatar</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] mx-auto rounded-full my-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Experience a conversation with my AI-powered digital twin. Ask me anything about technology, 
            healthcare, community initiatives, or my personal journey - powered by advanced AI.
          </p>
          
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => handleConnectClick('general')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white rounded-xl px-8 py-6 text-lg shadow-neon-purple hover-float group"
              size="lg"
            >
              <Bot className="h-6 w-6 mr-3" />
              <span>Start Chatting with My Digital Twin</span>
              <ExternalLink className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        {/* Domain topics showcase */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="glass-card bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold text-white">Specialized Topics</h4>
              <Button 
                variant="outline" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-[#0EA5E9]/30 text-white"
              >
                {isExpanded ? 'Show Less' : 'Show All Topics'}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Grid display for popular domains */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isExpanded ? '' : 'md:grid-rows-1 overflow-hidden'}`}>
              {domains.slice(0, isExpanded ? domains.length : 3).map((domain, index) => {
                const Icon = domain.icon;
                
                return (
                  <motion.div
                    key={domain.id}
                    className="glass-card p-4 rounded-xl border border-white/10 hover:border-[#0EA5E9]/30 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={() => handleConnectClick(domain.id)}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`} style={{ backgroundColor: domain.color }}>
                        <Icon size={18} />
                      </div>
                      <h5 className="font-medium text-white">{domain.title}</h5>
                    </div>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {domain.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full justify-between mt-2 border-white/10 text-white hover:bg-white/10">
                      <span>Chat About This</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-4xl h-[80vh] p-0">
          <DialogHeader className="p-6 border-b flex-row justify-between items-start">
            <div>
              <DialogTitle className="text-xl mb-2">Digital Avatar - {domain?.title || 'General Chat'}</DialogTitle>
              <DialogDescription>
                {domain ? domain.description : 'Ask me anything about my expertise and experiences.'}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)} className="h-8 w-8">
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
