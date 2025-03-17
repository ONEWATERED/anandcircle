
import React from 'react';
import PassionCard from './PassionCard';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { domains } from '@/data/domainData';

// Updated passions array with more concise descriptions
const passions = [
  {
    title: "Nuclear Family",
    description: "Strong families as the cornerstone of society, integrating evidence-based parenting frameworks with traditional values for raising resilient children.",
    colorAccent: "bg-rose-500"
  },
  {
    title: "Wellness",
    description: "Data-driven approaches to optimize nutrition, wellness, and mindful living with unique engineering insights into health systems.",
    colorAccent: "bg-blue-500"
  },
  {
    title: "One Water",
    description: "Integrating water infrastructure with environmental sustainability through technology, health outcomes, and community resilience.",
    colorAccent: "bg-cyan-500"
  },
  {
    title: "AI & Data",
    description: "Implementing advanced AI solutions across governmental and regulatory environments to transform organizations through innovative technology.",
    colorAccent: "bg-emerald-500"
  },
  {
    title: "Mentoring",
    description: "Frameworks for unlocking potential through actionable growth strategies, drawing from experience managing teams in complex environments.",
    colorAccent: "bg-purple-500"
  }
];

const PassionSection = () => {
  return (
    <section id="passions" className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center mb-10 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">My Domains</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Areas of Expertise & Innovation</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            My work spans five interconnected domains where I drive innovation and deliver measurable impact.
          </p>
        </div>
        
        {/* Interactive Animated Graphic */}
        <div className="mb-12">
          <InterconnectedDomainsGraphic />
        </div>
        
        {/* Domain Cards - More compact horizontal layout on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {passions.map((passion, index) => (
            <PassionCard
              key={passion.title}
              title={passion.title}
              description={passion.description}
              colorAccent={passion.colorAccent}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassionSection;
