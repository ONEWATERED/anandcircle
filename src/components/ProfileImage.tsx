
import React, { useEffect, useState } from 'react';
import { Linkedin, Twitter, Users, Youtube, Music, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProfileImage, getUserProfileData } from '@/utils/imageLoader';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SocialLinks {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true);
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: '#anand-circle'
  });

  useEffect(() => {
    // Load profile image and social links
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Load profile image
        const savedImage = await getProfileImage();
        console.log("Loaded profile image:", savedImage);
        if (savedImage) {
          setProfileImage(savedImage);
        } else {
          // Fallback to default image
          setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
        }
        
        // Load social links
        const userData = await getUserProfileData();
        if (userData && userData.socialLinks) {
          setSocialLinks(userData.socialLinks as SocialLinks);
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        // Fallback to default image on error
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();

    // Set interval for the avatar animation
    const pulseInterval = setInterval(() => {
      setIsAvatarPulsing(prev => !prev);
    }, 2000);

    // Show the avatar dialog automatically after 3 seconds
    const dialogTimer = setTimeout(() => {
      setShowAvatarDialog(true);
    }, 3000);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(dialogTimer);
    };
  }, []);

  const handleAvatarHover = () => {
    setShowAvatarHint(true);
  };

  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
  };

  return (
    <div className="relative">
      {/* Main image container with soft blend effect */}
      <div className="relative z-10">
        <div className="aspect-[3/4] overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center animate-pulse">
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          ) : profileImage ? (
            <div className="relative">
              {/* Enhanced blurred background for softer edges */}
              <div 
                className="absolute inset-0 -m-8 scale-125 blur-2xl opacity-60"
                style={{ 
                  backgroundImage: `url(${profileImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              {/* Extra gradient overlay for better color blending with page background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-50 via-transparent to-gray-50 opacity-80"></div>
              
              {/* Main image with enhanced glass effect */}
              <div className="glass-card relative p-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
                <img 
                  src={profileImage} 
                  alt="Hardeep Anand" 
                  className="w-full h-full object-cover rounded-xl z-10"
                  onError={() => {
                    console.log("Image failed to load, falling back to default");
                    setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
                  }}
                />
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-300/10 to-blue-300/10 mix-blend-overlay"></div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Professional photo here</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Digital Avatar Interactive Element */}
      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogTrigger asChild>
          <Link 
            to="#"
            className="absolute -top-3 -right-3 z-30"
            onMouseEnter={handleAvatarHover}
            onMouseLeave={handleAvatarLeave}
          >
            <div className={`neo-glass p-1.5 rounded-full shadow-lg transition-all duration-300 ${isAvatarPulsing ? 'animate-pulse ring-4 ring-primary/60 scale-105' : 'ring-2 ring-primary/40'}`}>
              <Avatar className="h-12 w-12 border-2 border-white/60 bg-primary/10">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
                  AI
                </AvatarFallback>
              </Avatar>
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10"></div>
            </div>
            
            {/* Message indicator */}
            <div className={`absolute -top-1 -right-1 bg-accent rounded-full p-0.5 shadow-md border border-white ${isAvatarPulsing ? 'animate-bounce' : ''}`}>
              <MessageCircle size={14} className="text-white" fill="white" />
            </div>
            
            {/* Tooltip that appears on hover */}
            {showAvatarHint && (
              <div className="absolute right-0 top-14 glass-card p-2 rounded-xl shadow-lg min-w-48 animate-fade-in z-50">
                <Badge className="bg-primary mb-1">Digital Avatar</Badge>
                <p className="text-xs text-foreground/90">Chat with my digital avatar. Get to know me better!</p>
              </div>
            )}
          </Link>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-[#8B5CF6] to-[#6E59A5] text-white shadow-[0_0_30px_rgba(139,92,246,0.5)]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Meet My Digital Avatar</DialogTitle>
            <DialogDescription className="text-white/80">
              Connect with my AI-powered digital twin to learn more about my work, interests, and vision.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="neo-glass p-3 rounded-full bg-white/10 backdrop-blur-xl">
              <Avatar className="h-24 w-24 border-2 border-white/60">
                <AvatarFallback className="bg-gradient-to-br from-[#D6BCFA] to-[#9b87f5] text-white text-2xl font-bold">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl -z-10"></div>
            </div>
            <p className="text-center text-white/90 px-2">
              My digital avatar can answer questions about my experience, projects, and vision for AI and healthcare. It's always learning and improving!
            </p>
            <div className="flex gap-3 mt-2">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={() => setShowAvatarDialog(false)}>
                Maybe Later
              </Button>
              <Button className="bg-white text-[#8B5CF6] hover:bg-white/90 border-0">
                Chat Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Enhanced decorative elements with more blur for better blending */}
      <div className="absolute -top-5 -right-5 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-400/20 rounded-full blur-3xl z-0"></div>
      
      {/* Enhanced Social Media Links - More prominent with increased spacing */}
      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-5 z-20">
        <a href={socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" 
           className="glass-card p-3.5 rounded-full hover:bg-primary/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110" 
           aria-label="LinkedIn">
          <Linkedin size={26} className="text-primary" />
        </a>
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
           className="glass-card p-3.5 rounded-full hover:bg-blue-400/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110" 
           aria-label="Twitter">
          <Twitter size={26} className="text-blue-400" />
        </a>
        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
           className="glass-card p-3.5 rounded-full hover:bg-red-500/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110" 
           aria-label="YouTube">
          <Youtube size={26} className="text-red-500" />
        </a>
        <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer"
           className="glass-card p-3.5 rounded-full hover:bg-green-500/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110" 
           aria-label="Spotify">
          <Music size={26} className="text-green-500" />
        </a>
        <Link to={socialLinks.anandCircle}
              className="glass-card p-3.5 rounded-full hover:bg-accent/10 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110" 
              aria-label="ANAND Circle">
          <Users size={26} className="text-accent" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileImage;
