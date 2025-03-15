
import React from 'react';
import PassionCard from './PassionCard';

const passions = [
  {
    title: "Health & Wellness",
    description: "Drawing from personal health challenges, I share insights on nutrition, wellness, and mindful living. My engineering background gives me a unique perspective on understanding health systems and optimizing personal well-being.",
    cta: "Explore Health Resources",
    ctaLink: "#",
    colorAccent: "bg-blue-500"
  },
  {
    title: "Mentoring & Giving Back",
    description: "Throughout my career, I've been passionate about helping others navigate their professional journeys. I connect emerging professionals with opportunities and insights drawn from my executive experience.",
    cta: "Join My Circle Community",
    ctaLink: "#",
    colorAccent: "bg-purple-500"
  },
  {
    title: "Data & Technology",
    description: "Implementing AI and data solutions across government and regulatory environments has been a cornerstone of my work. I share experiences and frameworks for technology adoption in complex organizations.",
    cta: "Discover Tech Innovations",
    ctaLink: "#",
    colorAccent: "bg-emerald-500"
  }
];

const PassionSection = () => {
  return (
    <section id="passions" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">My Passions</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Areas of Focus & Expertise</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            My work spans three main domains where I focus my energy and expertise, 
            each representing an area where I've achieved impact and continue to innovate.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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
