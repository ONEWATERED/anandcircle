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
  ChevronDown
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

  const domain = selectedDomain ? domains.find(d => d.id === selectedDomain) : null;
  const domainUrl = selectedDomain ? `https://www.delphi.ai/hardeepanand?domain=${selectedDomain}` : 'https://www.delphi.ai/hardeepanand';

  return (
    <section id="digital-avatar" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="section-container">
        <div className="text-center mb-10 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">Connect with My Digital Avatar</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Ask Me Anything</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Experience a conversation with my digital avatar powered by AI. Choose a domain you'd like to discuss 
            and start a meaningful interaction based on my expertise and perspectives.
          </p>
          
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => handleConnectClick('general')}
              className="group"
              variant="outline"
            >
              <span>Visit My Full Digital Avatar</span>
              <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </div>
        </div>
        
        {/* Collapsible Domain Topics */}
        <div className="max-w-3xl mx-auto">
          <Collapsible
            open={isExpanded}
            onOpenChange={setIsExpanded}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="p-5 flex justify-between items-center">
              <h4 className="font-semibold">Browse Topics</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="p-5 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {domains.map((domain, index) => {
                  const Icon = domain.icon;
                  
                  return (
                    <motion.div
                      key={domain.id}
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                      onClick={() => handleConnectClick(domain.id)}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`} style={{ backgroundColor: domain.color }}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{domain.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-1">{domain.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="p-5 pt-0 border-t border-gray-100 flex justify-center">
                <Button size="sm" className="w-full md:w-auto" onClick={() => handleConnectClick('general')}>
                  Chat About Any Topic
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Domain cards in horizontal scrolling container (when collapsed) */}
          {!isExpanded && (
            <div className="mt-6 overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex space-x-4 px-2 min-w-max">
                {domains.map((domain, index) => {
                  const Icon = domain.icon;
                  
                  return (
                    <motion.div
                      key={domain.id}
                      className="flex-shrink-0 w-[200px] glass-card px-4 py-4 rounded-xl border border-gray-200 hover:border-primary/20 transition-all hover:shadow-lg cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      onClick={() => handleConnectClick(domain.id)}
                    >
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`} style={{ backgroundColor: domain.color }}>
                          <Icon size={18} />
                        </div>
                        <h4 className="font-medium">{domain.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {domain.description}
                      </p>
                      <Button variant="ghost" size="sm" className="w-full text-xs justify-start px-2">
                        <span>Chat About This Topic</span>
                        <ExternalLink className="ml-auto h-3 w-3" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-4xl h-[80vh] p-0">
          <DialogHeader className="p-6 border-b">
            <div className="flex items-start justify-between w-full">
              <div>
                <DialogTitle className="text-xl mb-2">Digital Avatar - {domain?.title || 'General Chat'}</DialogTitle>
                <DialogDescription>
                  {domain ? domain.description : 'Ask me anything about my expertise and experiences.'}
                </DialogDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
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
