
import React from 'react';
import ProfileImage from './ProfileImage';
import ResumeButton from './ResumeButton';
import { createGlobalStyle } from 'styled-components';
import { Award, Droplets, Globe, GraduationCap, Briefcase, Star } from 'lucide-react';

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

const Story = () => {
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
              {/* Milestone 1 */}
              <div className="relative">
                <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                  <GraduationCap size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary">The Journey Begins</h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Nearly 30 years ago, I arrived in the United States as an immigrant student with determination and dreams. This foundation of perseverance shaped my approach to challenges and opportunities that would follow.
                </p>
              </div>
              
              {/* Milestone 2 */}
              <div className="relative">
                <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                  <Briefcase size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Building Expertise</h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  My career began as a consultant, where I developed critical problem-solving skills and sector knowledge. This experience allowed me to transition into regulation, where I gained a deep understanding of policy frameworks and public service.
                </p>
              </div>
              
              {/* Milestone 3 */}
              <div className="relative">
                <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                  <Award size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Executive Leadership</h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  As Public Works Director for the City of Fort Lauderdale, I led transformative initiatives that improved infrastructure and community services. This executive role taught me how to balance competing priorities while maintaining a focus on public benefit.
                </p>
              </div>
              
              {/* Milestone 4 */}
              <div className="relative">
                <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                  <Droplets size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Infrastructure Innovation</h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  I returned to Miami-Dade to oversee an $8.5 billion infrastructure program with Miami Water and Sewer, integrating cutting-edge technology with sustainable practices. This massive undertaking required strategic vision and meticulous execution.
                </p>
              </div>
              
              {/* Milestone 5 */}
              <div className="relative">
                <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 shadow-md">
                  <Globe size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Pioneering Leadership</h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  My appointment as the country's first One Water Director marked a historic milestone. I now oversee water management across 35 cities in Miami-Dade County, pioneering an integrated approach that connects communities, technology, and environmental stewardship.
                </p>
              </div>
              
              {/* Connecting line effect */}
              <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-accent/20"></div>
            </div>
            
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 my-6 opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}></div>
            
            <p className="text-muted-foreground opacity-0 animate-fade-up leading-relaxed text-lg" style={{ animationDelay: '500ms' }}>
              My journey from immigrant student to pioneering public servant embodies the power of perseverance and innovation. Throughout my career, I've leveraged technology and data to solve complex challenges, while maintaining a deep commitment to community service and sustainability.
            </p>
            
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
