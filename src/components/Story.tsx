
import React from 'react';
import ProfileImage from './ProfileImage';
import ResumeButton from './ResumeButton';

const Story = () => {
  return (
    <section id="story" className="relative py-24 overflow-hidden">
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
            
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-muted-foreground opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: '100ms' }}>
                From immigrant student to government executive, my journey has been shaped by strong family values and the intersection of technological innovation with domain expertise. As a Public Works Director with regulatory oversight of an $8.5 billion portfolio, I've developed a unique approach that integrates AI-driven solutions with deep sector knowledge.
              </p>
              
              <div className="w-24 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 my-6 opacity-0 animate-fade-up" style={{ animationDelay: '150ms' }}></div>
              
              <p className="text-muted-foreground opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                My career has been defined by finding connections between seemingly disparate fields—family structures, health systems, water management, technology, and executive leadership. This integrative perspective has allowed me to implement transformative solutions that address complex challenges through a comprehensive approach.
              </p>
              
              <div className="w-24 h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 my-6 opacity-0 animate-fade-up" style={{ animationDelay: '250ms' }}></div>
              
              <p className="text-muted-foreground opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: '300ms' }}>
                Throughout my executive leadership roles, I've leveraged data and AI to enhance operational efficiency, improve health outcomes, and advance water infrastructure resilience. This commitment to innovation continues to drive my work at the intersection of technology and essential services, all while maintaining a focus on strengthening family values.
              </p>
            </div>
            
            <div className="pt-8 flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
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
