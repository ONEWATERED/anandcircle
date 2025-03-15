import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ExternalLink,
  Linkedin,
  Pencil,
  Star,
  ThumbsUp,
  Loader2
} from 'lucide-react';
import { Person, SocialLink } from '@/types/connections';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { getConnectionImage } from '@/utils/imageLoader';

export const people: Person[] = [
  // Family
  { 
    id: 'preeti', 
    name: 'Preeti Anand', 
    category: 'family', 
    role: 'Wife', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'My life partner and greatest supporter',
    order: 1 // Wife at the top
  },
  { 
    id: 'rohit', 
    name: 'Rohit Anand', 
    category: 'family', 
    role: 'Son', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Loves me and makes me proud every day. Working on some magic in the web3 space, even though I had my reservations about him dropping out of med school. Now I believe in his vision and I\'m glad I let him pursue his passion rather than mine. He was the inspiration behind me to actually learn and connect Blockchain to the work I do.',
    order: 2 // Kid in second row
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
    ],
    order: 2 // Kid in second row
  },
  { 
    id: 'dad', 
    name: 'My Father', 
    category: 'family', 
    role: 'Late Father', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Instilled core values at an early age',
    order: 3 // Parent in third row
  },
  { 
    id: 'mom', 
    name: 'My Mother', 
    category: 'family', 
    role: 'Mother', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Shaped who I am today',
    order: 3 // Parent in third row
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

  // Unprofessional Entrepreneurs (new category)
  { 
    id: 'garyv', 
    name: 'Gary Vaynerchuk', 
    category: 'unprofessional', 
    role: 'Hustler & Social Media Maven', 
    image: '/placeholder.svg',
    relationship: 'Straight-talking entrepreneur who cuts through the BS',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/garyvee' },
      { platform: 'twitter', url: 'https://twitter.com/garyvee' }
    ],
    linkedInUrl: 'https://linkedin.com/in/garyvaynerchuk'
  },
  { 
    id: 'mreaves', 
    name: 'Myron Eaves', 
    category: 'unprofessional', 
    role: 'Fresh & Fit Podcast Host', 
    image: '/placeholder.svg',
    relationship: 'Controversial but honest voice in the dating space',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/freshandfit' }
    ]
  },
  { 
    id: 'cmiller', 
    name: 'Chris Miller', 
    category: 'unprofessional', 
    role: 'Dropshipping Guru', 
    image: '/placeholder.svg',
    relationship: 'Started from nothing, built a 7-figure business without a college degree',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/chrismiller' }
    ]
  },

  // Recommended People (new category)
  { 
    id: 'jrogan', 
    name: 'Joe Rogan', 
    category: 'recommended', 
    role: 'Podcast Host & Commentator', 
    image: '/placeholder.svg',
    relationship: 'Best long-form interviewer, brings out authentic discussions',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/joerogan' },
      { platform: 'twitter', url: 'https://twitter.com/joerogan' }
    ]
  },
  { 
    id: 'jpeterson', 
    name: 'Jordan Peterson', 
    category: 'recommended', 
    role: 'Clinical Psychologist & Author', 
    image: '/placeholder.svg',
    relationship: 'Profound thinker on meaning and personal responsibility',
    linkedInUrl: 'https://linkedin.com/in/jordan-peterson'
  },
  { 
    id: 'mmalhotra', 
    name: 'Mukesh Malhotra', 
    category: 'recommended', 
    role: 'Spiritual Teacher', 
    image: '/placeholder.svg',
    relationship: 'Hidden gem for those seeking inner peace and balanced living',
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/spiritualawakening' }
    ]
  },
  { 
    id: 'sjoshi', 
    name: 'Sadhna Joshi', 
    category: 'recommended', 
    role: 'Holistic Health Expert', 
    image: '/placeholder.svg',
    relationship: 'Combines ancient wisdom with modern science for total wellbeing',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/sadhnajoshi' }
    ],
    linkedInUrl: 'https://linkedin.com/in/sadhna-joshi'
  }
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
    case 'unprofessional':
      return <Star className="h-4 w-4" />;
    case 'recommended':
      return <ThumbsUp className="h-4 w-4" />;
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
  const [imageUrl, setImageUrl] = useState<string | null>(person.image || '/placeholder.svg');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSupabaseImage = async () => {
      try {
        // Try to get the image from Supabase first
        const supabaseImage = await getConnectionImage(person.id);
        if (supabaseImage) {
          setImageUrl(supabaseImage);
        }
      } catch (error) {
        console.error(`Error loading image for ${person.name}:`, error);
      } finally {
        setIsImageLoading(false);
      }
    };

    loadSupabaseImage();
  }, [person.id, person.name]);

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
              {isImageLoading ? (
                <div className="h-full w-full flex items-center justify-center bg-muted">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                </div>
              ) : (
                <>
                  <AvatarImage src={imageUrl || '/placeholder.svg'} alt={person.name} />
                  <AvatarFallback className="bg-muted">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </>
              )}
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
            
            {person.relationship && person.id === 'rohit' ? (
              <p className="text-xs italic mt-2 text-primary/80 max-w-[220px] mx-auto">
                {person.relationship}
              </p>
            ) : person.relationship && (
              <p className="text-xs italic mt-2 text-primary/80">{person.relationship}</p>
            )}
          </div>
          
          <div className="flex space-x-3 mt-1">
            {person.socialLinks && person.socialLinks.map((link, index) => (
              <SocialIcon key={index} platform={link.platform} url={link.url} />
            ))}
            {person.linkedInUrl && (
              <a 
                href={person.linkedInUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
          
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
  const [displayPeople, setDisplayPeople] = useState<Person[]>(people);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // First check local storage
        const savedPeople = localStorage.getItem('connections');
        
        if (savedPeople) {
          try {
            const parsedPeople = JSON.parse(savedPeople);
            if (Array.isArray(parsedPeople) && parsedPeople.length > 0) {
              // Update images from Supabase if available
              const updatedPeople = await Promise.all(
                parsedPeople.map(async (person) => {
                  try {
                    const supabaseImage = await getConnectionImage(person.id);
                    return supabaseImage ? { ...person, image: supabaseImage } : person;
                  } catch (error) {
                    console.error(`Error fetching image for ${person.name}:`, error);
                    return person;
                  }
                })
              );
              
              setDisplayPeople(updatedPeople);
            }
          } catch (error) {
            console.error('Error parsing connections data:', error);
          }
        } else {
          // If nothing in localStorage, use default people data
          setDisplayPeople(people);
        }
      } catch (error) {
        console.error('Error loading connections data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const familyMembers = displayPeople.filter(p => p.category === 'family');
  const nonFamilyMembers = displayPeople.filter(p => p.category !== 'family');
  
  const wifeRow = familyMembers.filter(p => p.order === 1);
  const kidsRow = familyMembers.filter(p => p.order === 2);
  const parentsRow = familyMembers.filter(p => p.order === 3);
  
  return (
    <section className="py-16 relative overflow-hidden">
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
          
          <div className="mt-4 flex justify-center opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link to="/connections">
              <Button variant="outline" className="gap-2">
                <Pencil className="h-4 w-4" />
                Manage Connections
              </Button>
            </Link>
          </div>
        </div>
        
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
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your connections...</p>
          </div>
        ) : (
          <>
            <div className="mb-14 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-12 bg-primary/30"></div>
                <h3 className="text-xl font-semibold px-4 flex items-center gap-2">
                  <Heart size={20} className="text-rose-500" fill="#FDA4AF" />
                  <span>Family Circle</span>
                </h3>
                <div className="h-px w-12 bg-primary/30"></div>
              </div>
              
              {wifeRow.length > 0 && (
                <div className="grid grid-cols-1 max-w-xs mx-auto gap-6 mb-6">
                  {wifeRow.map(person => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              )}
              
              {kidsRow.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 max-w-xl mx-auto gap-6 mb-6">
                  {kidsRow.map(person => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              )}
              
              {parentsRow.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 max-w-xl mx-auto gap-6">
                  {parentsRow.map(person => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              )}
            </div>
            
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
                <TabsList className="w-full max-w-lg grid grid-cols-7 h-auto mb-8 mx-auto bg-background/70 backdrop-blur-sm">
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
                  <TabsTrigger value="unprofessional" className="text-xs py-2 h-auto flex gap-1 items-center">
                    <Star className="h-3 w-3" /> Edgy
                  </TabsTrigger>
                  <TabsTrigger value="recommended" className="text-xs py-2 h-auto flex gap-1 items-center">
                    <ThumbsUp className="h-3 w-4" /> Recommended
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="politics" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.filter(p => p.category === 'politics').map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="business" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.filter(p => p.category === 'business').map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="health" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.filter(p => p.category === 'health').map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="learning" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.filter(p => p.category === 'learning').map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="unprofessional" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.filter(p => p.category === 'unprofessional').map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="recommended" className="mt-0">
                  <ScrollArea className="h-[500px] w-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {nonFamilyMembers.filter(p => p.category === 'recommended').map(person => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FollowingSection;
