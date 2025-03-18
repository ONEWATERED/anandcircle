
import React from 'react';
import PassionCard from './PassionCard';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { domains } from '@/data/domainData';
import { useIsMobile } from '@/hooks/use-mobile';

// Updated passions array with more concise descriptions and links
const passions = [
  {
    title: "Nuclear Family",
    description: "Strong families as the cornerstone of society, integrating evidence-based parenting frameworks with traditional values for raising resilient children.",
    colorAccent: "bg-rose-500",
    link: "https://www.circleso.com"
  },
  {
    title: "Wellness",
    description: "Data-driven approaches to optimize nutrition, wellness, and mindful living with unique engineering insights into health systems.",
    colorAccent: "bg-blue-500",
    link: "https://www.onewater.ai"
  },
  {
    title: "One Water",
    description: "Integrating water infrastructure with environmental sustainability through technology, health outcomes, and community resilience.",
    colorAccent: "bg-cyan-500",
    link: "https://www.onewater.ai"
  },
  {
    title: "AI & Data",
    description: "Implementing advanced AI solutions across governmental and regulatory environments to transform organizations through innovative technology.",
    colorAccent: "bg-emerald-500",
    link: "https://www.onewater.ai"
  },
  {
    title: "Mentoring",
    description: "Frameworks for unlocking potential through actionable growth strategies, drawing from experience managing teams in complex environments.",
    colorAccent: "bg-purple-500",
    link: "https://www.circleso.com"
  }
];

const PassionSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="passions" className="py-6 md:py-8">
      <div className="section-container">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-2">My Domains</h2>
          <h3 className="text-xl md:text-4xl font-display font-bold mb-3 md:mb-4 text-white">Areas of Expertise & Innovation</h3>
          <div className="h-1 w-16 md:w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-3 md:mt-4 px-4 text-sm md:text-base">
            My work spans five interconnected domains where I drive innovation and deliver measurable impact.
            <a href="#articles" className="text-primary hover:underline ml-1">
              Check out related articles →
            </a>
          </p>
        </div>
        
        {/* Interactive Graphic - reduced margin */}
        <div className="mb-4 md:mb-6">
          <InterconnectedDomainsGraphic />
        </div>
        
        {/* Domain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 px-2 md:px-0 pb-4">
          {passions.map((passion, index) => (
            <PassionCard
              key={passion.title}
              title={passion.title}
              description={passion.description}
              colorAccent={passion.colorAccent}
              index={index}
              link={passion.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassionSection;
