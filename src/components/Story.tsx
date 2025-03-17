
import React from 'react';
import ProfileImage from './ProfileImage';
import ResumeButton from './ResumeButton';
import { createGlobalStyle } from 'styled-components';
import { Award, Droplets, Globe, GraduationCap, Briefcase, Star, Loader2, Shield, Lightbulb } from 'lucide-react';
import { useStoryMilestones } from '@/hooks/useStoryMilestones';

// Add global style for the neural network animations
const NeuralAnimations = createGlobalStyle`
  @keyframes neural-particle-1 {
    0% { transform: translate(10px, 50px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translate(90px, 10px); opacity: 0; }
  }
  
  @keyframes neural-particle-2 {
    0% { transform: translate(10px, 50px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translate(90px, 10px); opacity: 0; }
  }
  
  @keyframes neural-particle-3 {
    0% { transform: translate(10px, 50px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translate(90px, 10px); opacity: 0; }
  }
  
  @keyframes neural-data-1 {
    0% { opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes neural-data-2 {
    0% { opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

// Map icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={16} className="text-primary" />,
  Briefcase: <Briefcase size={16} className="text-primary" />,
  Award: <Award size={16} className="text-primary" />,
  Droplets: <Droplets size={16} className="text-primary" />,
  Globe: <Globe size={16} className="text-primary" />,
  Star: <Star size={16} className="text-primary" />,
  Shield: <Shield size={16} className="text-primary" />,
  Lightbulb: <Lightbulb size={16} className="text-primary" />
};

const Story = () => {
  const { milestones, loading, error } = useStoryMilestones();

  console.log('Story component rendering with:', { 
    milestoneCount: milestones.length,
    loading,
    error: error?.message
  });

  return (
    <section id="story" className="relative py-24 overflow-hidden">
      <NeuralAnimations />
      
      {/* Background with subtle gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white z-0"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(127, 127, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 127, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}>
      </div>
      
      {/* Light glow effects */}
      <div className="absolute top-1/4 right-1/5 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text content - spans 7 columns on desktop */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-display font-bold opacity-0 animate-fade-up mb-6">
              My <span className="text-gradient-primary">Story</span>
            </h2>
            
            {/* Timeline element */}
            <div className="relative border-l-2 border-primary/20 pl-8 pb-2 space-y-8 opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading story...</span>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                  <p>Failed to load story milestones. Please try again later.</p>
                </div>
              ) : milestones.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">No story milestones found. Please add some from the admin panel.</p>
                </div>
              ) : (
                <>
                  {milestones.map((milestone, index) => (
                    <div className="relative" key={milestone.id}>
                      <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                        {iconMap[milestone.icon]}
                      </div>
                      <h3 className="text-lg font-semibold text-primary">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mt-2">
                        {milestone.description}
                      </p>
                      
                      {/* Signature after the last milestone */}
                      {index === milestones.length - 1 && (
                        <div className="text-left mt-3">
                          <p className="text-muted-foreground text-sm italic">Grateful,</p>
                          <h3 className="text-xl font-['Pinyon_Script',_cursive] text-primary/90">Hardeep</h3>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
              
              {/* Connecting line effect */}
              <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-accent/20"></div>
            </div>
            
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 my-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}></div>
            
            <div className="pt-8 flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '600ms' }}>
              <a 
                href="#passions" 
                className="inline-flex items-center justify-center h-11 px-6 font-medium text-white transition duration-200 rounded-lg bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md"
              >
                Explore My Domains
              </a>
              
              {/* Resume Button */}
              <ResumeButton 
                variant="outline" 
                size="lg"
              />
            </div>
          </div>
          
          {/* Profile image - spans 5 columns on desktop */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end opacity-0 animate-fade-up neo-glass p-4 rounded-3xl shadow-lg" style={{ animationDelay: '300ms' }}>
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
