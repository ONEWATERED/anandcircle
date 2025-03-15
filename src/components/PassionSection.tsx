
import React from 'react';
import PassionCard from './PassionCard';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated passions array with the requested changes
const passions = [
  {
    title: "Nuclear Families",
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
    title: "Coaching & Mentoring",
    description: "I focus on coaching, mentoring, and training professionals to unlock their potential. My frameworks provide actionable strategies for growth, drawing from experience managing cross-functional teams and developing talent in complex environments.",
    cta: "Development Resources",
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
        
        {/* Interactive Animated Graphic */}
        <div className="mb-20">
          <InterconnectedDomainsGraphic />
        </div>
        
        {/* Domain Cards */}
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

        {/* The HARDEEP ANAND Circle Section */}
        <div id="anand-circle" className="mt-32 opacity-0 animate-fade-up">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
            {/* Background shapes */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-accent/10 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  <Users size={32} />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">Join The HARDEEP ANAND Circle</h3>
              
              <p className="text-lg text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Connect with an exclusive community where we integrate insights across nuclear families, health innovation, 
                water sustainability, AI advancement, and coaching & mentoring. The HARDEEP ANAND Circle brings together professionals 
                and thought leaders committed to creating meaningful impact at these critical intersections.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 h-auto shadow-lg group">
                  <span>Join The Community</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Link to="/dashboard">
                  <Button variant="outline" className="border-primary/20 hover:bg-primary/5 px-8 py-6 h-auto">
                    <span>Member Dashboard</span>
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 text-center text-muted-foreground">
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
