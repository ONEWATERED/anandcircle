
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Flag, 
  Briefcase, 
  Activity, 
  GraduationCap, 
  Instagram, 
  Youtube, 
  Twitter,
  ExternalLink
} from 'lucide-react';

interface SocialLink {
  platform: 'instagram' | 'youtube' | 'twitter';
  url: string;
}

interface Person {
  id: string;
  name: string;
  category: 'family' | 'politics' | 'business' | 'health' | 'learning';
  role: string;
  image?: string;
  special?: boolean;
  relationship?: string;
  socialLinks?: SocialLink[];
}

const people: Person[] = [
  // Family
  { 
    id: 'rohit', 
    name: 'Rohit Anand', 
    category: 'family', 
    role: 'Son', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Learning from his fresh perspective every day' 
  },
  { 
    id: 'simi', 
    name: 'Simi Anand', 
    category: 'family', 
    role: 'Daughter', 
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    special: true, 
    relationship: 'Teaching me new ways to see the world',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/simianand' },
      { platform: 'youtube', url: 'https://youtube.com/simianand' },
      { platform: 'twitter', url: 'https://twitter.com/simianand' }
    ] 
  },
  { 
    id: 'preeti', 
    name: 'Preeti Anand', 
    category: 'family', 
    role: 'Wife', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'My life partner and greatest supporter' 
  },
  { 
    id: 'dad', 
    name: 'My Father', 
    category: 'family', 
    role: 'Late Father', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Instilled core values at an early age' 
  },
  { 
    id: 'mom', 
    name: 'My Mother', 
    category: 'family', 
    role: 'Mother', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Shaped who I am today' 
  },
  
  // Politics
  { id: 'candace', name: 'Candace Owens', category: 'politics', role: 'Political Commentator', image: '/placeholder.svg' },
  { id: 'trump', name: 'Donald Trump', category: 'politics', role: 'President', image: '/placeholder.svg' },
  
  // Business
  { id: 'naval', name: 'Naval Ravikant', category: 'business', role: 'Entrepreneur & Investor', image: '/placeholder.svg' },
  { id: 'patrick', name: 'Patrick McDavid', category: 'business', role: 'Entrepreneur', image: '/placeholder.svg' },
  { id: 'andrew', name: 'Andrew Tate', category: 'business', role: 'Entrepreneur', image: '/placeholder.svg' },
  { id: 'shama', name: 'Shama Paul Chaudhary', category: 'business', role: 'Entrepreneur', image: '/placeholder.svg' },
  
  // Health
  { id: 'joe', name: 'Joe Dispenza', category: 'health', role: 'Author & Researcher', image: '/placeholder.svg' },
  { id: 'huberman', name: 'Dr. Andrew Huberman', category: 'health', role: 'Neuroscientist', image: '/placeholder.svg' },
  
  // Learning
  { id: 'sal', name: 'Sal Khan', category: 'learning', role: 'Khan Academy Founder', image: '/placeholder.svg' },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'family':
      return <Heart className="h-4 w-4" />;
    case 'politics':
      return <Flag className="h-4 w-4" />;
    case 'business':
      return <Briefcase className="h-4 w-4" />;
    case 'health':
      return <Activity className="h-4 w-4" />;
    case 'learning':
      return <GraduationCap className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

const SocialIcon = ({ platform, url }: SocialLink) => {
  const renderIcon = () => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-muted-foreground hover:text-primary transition-colors"
      aria-label={`${platform} profile`}
    >
      {renderIcon()}
    </a>
  );
};

const PersonCard = ({ person }: { person: Person }) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 h-full hover:shadow-md group ${
      person.special ? 'border-primary/20 bg-primary/5 hover:border-primary/30' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center gap-3">
          <div className={`relative ${person.special ? 'mt-4' : 'mt-2'}`}>
            <Avatar className={`h-20 w-20 transition-all duration-300 group-hover:scale-105 ${
              person.special ? 'border-2 border-primary/50 group-hover:border-primary' : ''
            }`}>
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback className="bg-muted">
                {person.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {person.special && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 shadow-md border border-white">
                <Heart size={12} className="text-white" fill="white" />
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-base mt-1 mb-0.5">{person.name}</h4>
            <p className="text-xs text-muted-foreground">{person.role}</p>
            
            {person.relationship && (
              <p className="text-xs italic mt-2 text-primary/80">{person.relationship}</p>
            )}
          </div>
          
          {person.socialLinks && person.socialLinks.length > 0 && (
            <div className="flex space-x-3 mt-1">
              {person.socialLinks.map((link, index) => (
                <SocialIcon key={index} platform={link.platform} url={link.url} />
              ))}
            </div>
          )}
          
          <Badge variant="outline" className="mt-1 bg-background/80 text-xs px-2 py-0 h-5 flex items-center gap-1">
            {getCategoryIcon(person.category)}
            <span className="capitalize">{person.category}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const FollowingSection = () => {
  const familyMembers = people.filter(p => p.category === 'family');
  const nonFamilyMembers = people.filter(p => p.category !== 'family');
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/20 to-cyan-200/20 blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold mb-3 opacity-0 animate-fade-up">
            <span className="text-gradient-primary">Connections</span> & Inspirations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
            The people who shape my thinking, inspire my work, and hold a special place in my heart — from family bonds to thought leaders across various domains.
          </p>
        </div>
        
        {/* Nuclear Family Highlight */}
        <div className="mb-12 glass-card p-6 rounded-xl border border-primary/10 max-w-3xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex-shrink-0 bg-gradient-to-br from-primary/20 to-purple-300/20 p-4 rounded-full">
              <Users size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">The Power of Nuclear Families</h3>
              <p className="text-muted-foreground">
                The nuclear family is the cornerstone of society and the foundation of my values. My children and family members are not only my greatest blessings but also my daily teachers, showing me new perspectives and reinforcing the importance of strong family bonds.
              </p>
            </div>
          </div>
        </div>
        
        {/* Family Section with enhanced design */}
        <div className="mb-14 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-primary/30"></div>
            <h3 className="text-xl font-semibold px-4 flex items-center gap-2">
              <Heart size={20} className="text-rose-500" fill="#FDA4AF" />
              <span>Family Circle</span>
            </h3>
            <div className="h-px w-12 bg-primary/30"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {familyMembers.map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
        
        {/* Thought Leaders & Inspirations with enhanced design */}
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-primary/30"></div>
            <h3 className="text-xl font-semibold px-4 flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <span>Thought Leaders & Inspirations</span>
            </h3>
            <div className="h-px w-12 bg-primary/30"></div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-lg grid grid-cols-5 h-auto mb-8 mx-auto bg-background/70 backdrop-blur-sm">
              <TabsTrigger value="all" className="text-xs py-2 h-auto">All</TabsTrigger>
              <TabsTrigger value="politics" className="text-xs py-2 h-auto flex gap-1 items-center">
                <Flag className="h-3 w-3" /> Politics
              </TabsTrigger>
              <TabsTrigger value="business" className="text-xs py-2 h-auto flex gap-1 items-center">
                <Briefcase className="h-3 w-3" /> Business
              </TabsTrigger>
              <TabsTrigger value="health" className="text-xs py-2 h-auto flex gap-1 items-center">
                <Activity className="h-3 w-3" /> Health
              </TabsTrigger>
              <TabsTrigger value="learning" className="text-xs py-2 h-auto flex gap-1 items-center">
                <GraduationCap className="h-3 w-3" /> Learning
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {nonFamilyMembers.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="politics" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {nonFamilyMembers.filter(p => p.category === 'politics').map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {nonFamilyMembers.filter(p => p.category === 'business').map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {nonFamilyMembers.filter(p => p.category === 'health').map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="learning" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {nonFamilyMembers.filter(p => p.category === 'learning').map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FollowingSection;
