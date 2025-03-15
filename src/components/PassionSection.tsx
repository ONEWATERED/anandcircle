
import React from 'react';
import PassionCard from './PassionCard';

const passions = [
  {
    title: "Family & Nuclear Values",
    description: "I believe strong families are the cornerstone of society. My approach integrates evidence-based parenting frameworks with traditional values to navigate modern challenges. I focus on practical solutions for raising resilient children while maintaining core family structures in a rapidly changing world.",
    cta: "Family Resources",
    ctaLink: "#",
    colorAccent: "bg-rose-500"
  },
  {
    title: "Health & Wellness",
    description: "Drawing from personal health challenges, I leverage data-driven approaches to optimize nutrition, wellness, and mindful living. My engineering background provides unique insights into health systems for maximizing personal and community well-being.",
    cta: "Explore Health Insights",
    ctaLink: "#",
    colorAccent: "bg-blue-500"
  },
  {
    title: "One Water",
    description: "My deep experience in water infrastructure and policy connects my technical expertise with environmental sustainability. This 'One Water' approach integrates technology, health outcomes, and community resilience in a comprehensive ecosystem perspective.",
    cta: "Water Initiatives",
    ctaLink: "#",
    colorAccent: "bg-cyan-500"
  },
  {
    title: "AI & Data Innovation",
    description: "Implementing advanced AI and data solutions across government and regulatory environments has been central to my work. I transform organizations through innovative technology adoption frameworks that bridge technical and operational gaps.",
    cta: "Tech Frameworks",
    ctaLink: "#",
    colorAccent: "bg-emerald-500"
  },
  {
    title: "Executive Leadership",
    description: "Throughout my career as a high-level executive, I've developed frameworks for navigating complex organizational challenges. I connect professionals with strategic insights drawn from my experience managing $8.5B portfolios and leading cross-functional teams.",
    cta: "Leadership Opportunities",
    ctaLink: "#",
    colorAccent: "bg-purple-500"
  }
];

const PassionSection = () => {
  return (
    <section id="passions" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">My Domains</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Areas of Expertise & Innovation</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            My work spans five interconnected domains where I drive innovation and deliver measurable impact,
            each representing an area where I've achieved significant results and continue to pioneer solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {passions.map((passion, index) => (
            <PassionCard
              key={passion.title}
              title={passion.title}
              description={passion.description}
              cta={passion.cta}
              ctaLink={passion.ctaLink}
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
