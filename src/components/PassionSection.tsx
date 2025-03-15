
import React from 'react';
import PassionCard from './PassionCard';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { domains } from '@/data/domainData';

// Updated passions array with more concise descriptions
const passions = [
  {
    title: "Nuclear Families",
    description: "Strong families as the cornerstone of society, integrating evidence-based parenting frameworks with traditional values for raising resilient children.",
    colorAccent: "bg-rose-500"
  },
  {
    title: "Health & Wellness",
    description: "Data-driven approaches to optimize nutrition, wellness, and mindful living with unique engineering insights into health systems.",
    colorAccent: "bg-blue-500"
  },
  {
    title: "One Water",
    description: "Integrating water infrastructure with environmental sustainability through technology, health outcomes, and community resilience.",
    colorAccent: "bg-cyan-500"
  },
  {
    title: "AI & Data Innovation",
    description: "Implementing advanced AI solutions across governmental and regulatory environments to transform organizations through innovative technology.",
    colorAccent: "bg-emerald-500"
  },
  {
    title: "Coaching & Mentoring",
    description: "Frameworks for unlocking potential through actionable growth strategies, drawing from experience managing teams in complex environments.",
    colorAccent: "bg-purple-500"
  }
];

const PassionSection = () => {
  return (
    <section id="passions" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center mb-12 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">My Domains</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Areas of Expertise & Innovation</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            My work spans five interconnected domains where I drive innovation and deliver measurable impact.
          </p>
        </div>
        
        {/* Interactive Animated Graphic */}
        <div className="mb-16">
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

        {/* The HARDEEP ANAND Circle Section - Simplified and more impactful */}
        <div id="anand-circle" className="mt-20 opacity-0 animate-fade-up">
          <div className="max-w-4xl mx-auto glass-card p-8 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
            {/* Background shapes */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-accent/10 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  <Users size={32} />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">Join The HARDEEP ANAND Circle</h3>
              
              <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
                Connect with professionals and thought leaders committed to creating meaningful impact 
                at the intersection of my five domains. Access exclusive resources, insights, and community.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 h-auto shadow-lg group w-full sm:w-auto">
                  <span>Join The Community</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Link to="/dashboard">
                  <Button variant="outline" className="border-primary/20 hover:bg-primary/5 px-8 py-6 h-auto w-full sm:w-auto">
                    <span>Member Dashboard</span>
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 text-center text-muted-foreground">
                <p className="flex items-center justify-center gap-2 text-sm">
                  <Zap size={16} className="text-accent" />
                  <span>Already 500+ professionals connecting and sharing insights</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionSection;
