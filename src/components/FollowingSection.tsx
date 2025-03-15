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
  Loader2,
  ChevronRight,
  Info
} from 'lucide-react';
import { Person, SocialLink } from '@/types/connections';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { getConnectionImage } from '@/utils/connectionImages';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { checkDatabaseConnection } from '@/utils/databaseUtils';

export const people: Person[] = [
  // Family - Keep all 4 family members as requested
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
    id: 'spark', 
    name: 'Spark', 
    category: 'family', 
    role: 'Pet Dog', 
    image: '/placeholder.svg', 
    special: true, 
    relationship: 'Our loyal companion',
    order: 3 // Pet in third row
  },
  
  // Politics - Only keep Candace as requested
  { id: 'candace', name: 'Candace Owens', category: 'politics', role: 'Political Commentator', image: '/placeholder.svg' },
  
  // Business - Only keep Patrick as requested
  { id: 'patrick', name: 'Patrick McDavid', category: 'business', role: 'Entrepreneur', image: '/placeholder.svg' },
  
  // Health - Only keep Dr. Huberman and Joe Dispenza as requested
  { id: 'joe', name: 'Joe Dispenza', category: 'health', role: 'Author & Researcher', image: '/placeholder.svg' },
  { id: 'huberman', name: 'Dr. Andrew Huberman', category: 'health', role: 'Neuroscientist', image: '/placeholder.svg' },

  // Remove all remaining people in other categories
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

const FamilyMemberCard = ({ person }: { person: Person }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(person.image || '/placeholder.svg');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadConnectionImage = async () => {
      try {
        setIsImageLoading(true);
        // Try to load from Supabase connection_images table
        const fetchedImageUrl = await getConnectionImage(person.id);
        
        if (fetchedImageUrl) {
          console.log(`Loaded image for ${person.name} from Supabase:`, fetchedImageUrl);
          setImageUrl(fetchedImageUrl);
        } else {
          // Use provided image or fallback
          setImageUrl(person.image || '/placeholder.svg');
          console.log(`Using default image for ${person.name}:`, person.image || '/placeholder.svg');
        }
      } catch (error) {
        console.error(`Error loading image for ${person.name}:`, error);
        // Fallback to the provided image or placeholder
        setImageUrl(person.image || '/placeholder.svg');
      } finally {
        setIsImageLoading(false);
      }
    };

    loadConnectionImage();
  }, [person.id, person.name, person.image]);

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md border-primary/10 bg-background/70 backdrop-blur-sm group-hover:border-primary/20">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-primary/20 transition-all duration-300 group-hover:border-primary">
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
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 shadow-md border border-white">
              <Heart size={12} className="text-white" fill="white" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-0.5">{person.name}</h4>
            <p className="text-xs text-muted-foreground">{person.role}</p>
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
          
          {person.relationship && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              "{person.relationship.length > 60 
                ? person.relationship.substring(0, 60) + '...' 
                : person.relationship}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PersonCard = ({ person }: { person: Person }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(person.image || '/placeholder.svg');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadConnectionImage = async () => {
      try {
        setIsImageLoading(true);
        // Try to load from Supabase connection_images table
        const fetchedImageUrl = await getConnectionImage(person.id);
        
        if (fetchedImageUrl) {
          console.log(`Loaded image for ${person.name} from Supabase:`, fetchedImageUrl);
          setImageUrl(fetchedImageUrl);
        } else {
          // Use provided image or fallback
          setImageUrl(person.image || '/placeholder.svg');
          console.log(`Using default image for ${person.name}:`, person.image || '/placeholder.svg');
        }
      } catch (error) {
        console.error(`Error loading image for ${person.name}:`, error);
        // Fallback to the provided image or placeholder
        setImageUrl(person.image || '/placeholder.svg');
      } finally {
        setIsImageLoading(false);
      }
    };

    loadConnectionImage();
  }, [person.id, person.name, person.image]);

  return (
    <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-md ${
      person.special ? 'border-primary/20 bg-primary/5' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center gap-3">
          <div className={`relative ${person.special ? 'mt-4' : 'mt-2'}`}>
            <Avatar className={`h-20 w-20 transition-all duration-300 ${
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
          
          {person.relationship && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              "{person.relationship.length > 60 
                ? person.relationship.substring(0, 60) + '...' 
                : person.relationship}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const FollowingSection = () => {
  const [displayPeople, setDisplayPeople] = useState<Person[]>(people);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<boolean>(false);
  
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        // For simplicity, anyone logged in can manage connections
        // In a real app, you'd check for specific admin roles
        setIsAdmin(!!session?.user);
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };
    
    checkUserRole();
  }, []);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Check database connection
        const isConnected = await checkDatabaseConnection();
        setConnectionError(!isConnected);
        
        // First check local storage
        const savedPeople = localStorage.getItem('connections');
        
        if (savedPeople) {
          try {
            const parsedPeople = JSON.parse(savedPeople);
            if (Array.isArray(parsedPeople) && parsedPeople.length > 0) {
              setDisplayPeople(parsedPeople);
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
  
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/20 to-cyan-200/20 blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-3 opacity-0 animate-fade-up">
            <span className="text-gradient-primary">Connections</span> & Inspirations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
            The people who shape my thinking, inspire my work, and hold a special place in my heart.
          </p>
          
          {isAdmin && (
            <div className="mt-4 flex justify-center opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Link to="/admin/connections">
                <Button variant="outline" className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Manage Connections
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your connections...</p>
          </div>
        ) : connectionError ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 p-4 rounded-full bg-amber-100">
              <ExternalLink className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-lg font-medium mb-2">Connection issue detected</p>
            <p className="text-muted-foreground max-w-md">
              We're having trouble connecting to the database. Showing cached data instead.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-center mb-8">
                <div className="h-px w-8 bg-primary/30"></div>
                <div className="neo-glass px-6 py-2 mx-4 flex items-center gap-2 rounded-full">
                  <Heart size={18} className="text-rose-500" fill="#FDA4AF" />
                  <span className="font-semibold">Family Circle</span>
                </div>
                <div className="h-px w-8 bg-primary/30"></div>
              </div>
              
              <div className="relative bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6 max-w-5xl mx-auto">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl"></div>
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
                  {familyMembers.slice(0, 3).map(person => (
                    <FamilyMemberCard key={person.id} person={person} />
                  ))}
                </div>
                {familyMembers.length > 3 && (
                  <div className="flex justify-center mt-6 relative z-10">
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <span>View More Family</span>
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                )}
              </div>
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
                <TabsList className="w-full max-w-lg grid grid-cols-4 h-auto mb-8 mx-auto bg-background/70 backdrop-blur-sm">
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
              </Tabs>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FollowingSection;
