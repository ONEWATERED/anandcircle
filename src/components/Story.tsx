
import React from 'react';

const Story = () => {
  return (
    <section id="story" className="bg-white py-20 md:py-32">
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">My Journey</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">From Immigrant to Executive</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Journey Phase 1 */}
          <div className="glass-card p-8 opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-primary mb-6">
              <span className="text-xl font-bold">1</span>
            </div>
            <h4 className="text-xl font-display font-semibold mb-4">The Beginning</h4>
            <p className="text-muted-foreground mb-4">
              My journey began as an immigrant student, navigating a new country with determination and hope. Each challenge became an opportunity to grow and adapt in unfamiliar territory.
            </p>
            <p className="text-muted-foreground">
              This formative experience laid the groundwork for my approach to problem-solving and innovation throughout my career.
            </p>
          </div>
          
          {/* Journey Phase 2 */}
          <div className="glass-card p-8 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-primary mb-6">
              <span className="text-xl font-bold">2</span>
            </div>
            <h4 className="text-xl font-display font-semibold mb-4">Professional Growth</h4>
            <p className="text-muted-foreground mb-4">
              As my career evolved, I found myself at the intersection of public service and technology. Leading an $8.5 billion initiative as Public Works Director, I discovered the power of integrating deep domain knowledge with technology.
            </p>
            <p className="text-muted-foreground">
              These experiences taught me how to implement innovative solutions within complex government structures.
            </p>
          </div>
          
          {/* Journey Phase 3 */}
          <div className="glass-card p-8 opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-primary mb-6">
              <span className="text-xl font-bold">3</span>
            </div>
            <h4 className="text-xl font-display font-semibold mb-4">Integration & Innovation</h4>
            <p className="text-muted-foreground mb-4">
              Today, I blend my executive experience with my passion for data, AI, and technology. This unique perspective allows me to approach problems holistically and implement solutions that drive meaningful impact.
            </p>
            <p className="text-muted-foreground">
              My focus has expanded to include mentoring others and sharing insights on health and wellness, creating a comprehensive approach to both work and life.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-fade-up" style={{ animationDelay: '500ms' }}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This journey has shaped my perspective and approach as a leader, innovator, and mentor. Each experience has contributed to my ability to navigate complex challenges and create meaningful solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
