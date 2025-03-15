
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  HeartPulse, 
  Droplet, 
  Brain, 
  GraduationCap,
  ExternalLink,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Domain-specific chat topics
const domainTopics = [
  {
    id: 'family',
    title: 'Nuclear Families',
    icon: Users,
    color: 'bg-rose-500',
    prompt: 'Talk to me about family structure, parenting frameworks, and building resilient children.',
    description: 'Discuss family values, parenting challenges, and building strong foundations.'
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: HeartPulse,
    color: 'bg-blue-500',
    prompt: 'Ask me about data-driven approaches to nutrition, wellness, and mindful living.',
    description: 'Explore holistic health strategies and engineering-based wellness optimization.'
  },
  {
    id: 'water',
    title: 'One Water',
    icon: Droplet,
    color: 'bg-cyan-500',
    prompt: 'Let\'s discuss water infrastructure, sustainability, and environmental policy.',
    description: 'Dive into water technology, infrastructure solutions, and sustainability practices.'
  },
  {
    id: 'ai',
    title: 'AI & Data Innovation',
    icon: Brain,
    color: 'bg-emerald-500',
    prompt: 'Chat with me about implementing AI solutions and data innovation in organizations.',
    description: 'Explore technology adoption frameworks and digital transformation strategies.'
  },
  {
    id: 'mentoring',
    title: 'Coaching & Mentoring',
    icon: GraduationCap,
    color: 'bg-purple-500',
    prompt: 'Seek advice on professional development, leadership, and unlocking your potential.',
    description: 'Discover actionable strategies for growth and talent development.'
  }
];

const DigitalCloneConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleConnectClick = (domainId: string) => {
    setSelectedDomain(domainId);
    setDialogOpen(true);
  };

  const domain = selectedDomain ? domainTopics.find(d => d.id === selectedDomain) : null;
  const domainUrl = selectedDomain ? `https://www.delphi.ai/hardeepanand?domain=${selectedDomain}` : 'https://www.delphi.ai/hardeepanand';

  return (
    <section id="digital-avatar" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">Connect with My Digital Avatar</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Ask Me Anything</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Experience a conversation with my digital avatar powered by AI. Choose a domain you'd like to discuss 
            and start a meaningful interaction based on my expertise and perspectives.
          </p>
          
          <div className="mt-8 flex justify-center">
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
        
        {/* Domain-specific connection cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-12">
          {domainTopics.map((domain, index) => {
            const Icon = domain.icon;
            
            return (
              <motion.div
                key={domain.id}
                className="glass-card p-6 rounded-xl border border-gray-200 hover:border-primary/20 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full ${domain.color} flex items-center justify-center text-white mb-5`}>
                    <Icon size={32} />
                  </div>
                  
                  <h4 className="text-xl font-display font-semibold mb-3">{domain.title}</h4>
                  
                  <p className="text-sm text-muted-foreground mb-5">
                    {domain.description}
                  </p>
                  
                  <Button
                    onClick={() => handleConnectClick(domain.id)}
                    className="w-full mt-auto"
                    variant="outline"
                  >
                    Chat About This Topic
                  </Button>
                </div>
              </motion.div>
            );
          })}
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
                  {domain?.prompt || 'Ask me anything about my expertise and experiences.'}
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
