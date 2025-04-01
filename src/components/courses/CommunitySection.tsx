
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users, GraduationCap, MessageSquare } from 'lucide-react';
import CourseEmailSignup from './CourseEmailSignup';

const CommunitySection = () => {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 text-left">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join My <span className="text-gradient-primary">Circle Community</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            I'd love for you to join our community of like-minded people interested in AI, prompt engineering, and health. 
            It's free to join, and you'll get early access to premium content later!
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="mr-3 rounded-full p-1 bg-primary/20">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Connect with me and other community members</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 rounded-full p-1 bg-primary/20">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Get free access to exclusive workshops and resources</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 rounded-full p-1 bg-primary/20">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Join our live Q&A sessions and discussions</span>
            </li>
          </ul>
          <a href="https://www.circleso.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gradient-to-r from-tech-cyan to-tech-purple hover:from-tech-cyan/90 hover:to-tech-purple/90 text-white shadow-neon-cyan">
              Join One Water Circle for Free
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
        
        <div className="md:w-1/2 space-y-6">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border-2 border-white/70 shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Circle Community Preview" 
                className="w-full aspect-video object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl -z-10"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-xl -z-10"></div>
            
            <div className="absolute top-4 right-4 glass-card p-2 rounded-full shadow-lg">
              <div className="flex items-center space-x-2 px-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium">Coming Soon</span>
              </div>
            </div>
          </div>
          
          <CourseEmailSignup />
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
