
import React from 'react';
import ProfileImage from './ProfileImage';
import ResumeButton from './ResumeButton';
import { Award, Droplets, Globe, GraduationCap, Briefcase, Star, Loader2, Shield, Lightbulb } from 'lucide-react';
import { useStoryMilestones } from '@/hooks/useStoryMilestones';

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

  return (
    <section id="story" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text content - spans 7 columns on desktop */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
            My Story
          </h2>
          
          {/* Timeline element */}
          <div className="relative border-l-2 border-primary/50 pl-6 pb-2 space-y-6">
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
                    <div className="absolute -left-[42px] flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/50 shadow-md">
                      {iconMap[milestone.icon]}
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-1">{milestone.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>
                    
                    {/* Signature after the last milestone */}
                    {index === milestones.length - 1 && (
                      <div className="text-left mt-3">
                        <p className="text-slate-500 text-sm italic">Grateful,</p>
                        <h3 className="text-xl font-['Pinyon_Script',_cursive] text-primary/90">Hardeep</h3>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="w-24 h-0.5 bg-primary/20 my-6"></div>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <a 
              href="#passions" 
              className="inline-flex items-center justify-center h-11 px-6 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90 shadow-md"
            >
              Explore My Domains
            </a>
            
            {/* Resume Button */}
            <ResumeButton 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-primary shadow-sm"
            />
          </div>
        </div>
        
        {/* Profile image - spans 5 columns on desktop */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="p-3 rounded-xl border border-slate-200 shadow-lg bg-white">
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
