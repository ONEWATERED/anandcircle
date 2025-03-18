
import React, { useEffect, useState } from 'react';
import { PersonalProfile } from '@/types/thought-leaders';
import SocialMediaLinks from './profile/SocialMediaLinks';
import AvatarDialog from './profile/AvatarDialog';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import DecorativeElements from './profile/DecorativeElements';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ensureHttpProtocol } from '@/utils/databaseConnection';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true);
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectionEffect, setShowConnectionEffect] = useState(false);
  const [loadingAttempts, setLoadingAttempts] = useState(0);
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        // First try to get from localStorage as it's faster
        const directProfileImage = localStorage.getItem('profileImageUrl');
        
        if (directProfileImage) {
          console.log('Found profile image in localStorage:', directProfileImage);
          setProfileImage(directProfileImage);
        }

        // Also try to fetch from database in case localStorage is outdated
        try {
          const { data: profileData, error } = await supabase
            .from('personal_profile')
            .select('photo_url')
            .eq('id', 'hardeep')
            .single();
            
          if (!error && profileData?.photo_url) {
            console.log('Found profile image in database:', profileData.photo_url);
            setProfileImage(profileData.photo_url);
            localStorage.setItem('profileImageUrl', profileData.photo_url);
          } else if (!directProfileImage) {
            // Only try this if we didn't find anything in localStorage
            const storedProfile = localStorage.getItem('personalProfile');
            
            if (storedProfile) {
              try {
                const profileData: PersonalProfile = JSON.parse(storedProfile);
                
                if (profileData.photo_url) {
                  console.log('Found profile image in personalProfile:', profileData.photo_url);
                  setProfileImage(profileData.photo_url);
                  localStorage.setItem('profileImageUrl', profileData.photo_url);
                } else {
                  setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
                }
                
                if (profileData.socialLinks) {
                  const processedLinks = {
                    linkedIn: ensureHttpProtocol(profileData.socialLinks.linkedin) || socialLinks.linkedIn,
                    twitter: ensureHttpProtocol(profileData.socialLinks.twitter) || socialLinks.twitter,
                    youtube: ensureHttpProtocol(profileData.socialLinks.youtube) || socialLinks.youtube,
                    spotify: ensureHttpProtocol(profileData.socialLinks.spotify) || socialLinks.spotify,
                    anandCircle: profileData.socialLinks.anandcircle || socialLinks.anandCircle
                  };
                  
                  setSocialLinks(processedLinks);
                }
              } catch (parseError) {
                console.error("Error parsing profile data:", parseError);
                setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
              }
            } else {
              setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
            }
          }
        } catch (error) {
          console.error("Error loading profile from Supabase:", error);
          if (!profileImage && loadingAttempts < 3) {
            setLoadingAttempts(prev => prev + 1);
            setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
          }
        }
        
        // Load social links
        try {
          const { data: socialLinksData, error } = await supabase
            .from('personal_social_links')
            .select('platform, url')
            .eq('profile_id', 'hardeep');
            
          if (!error && socialLinksData && socialLinksData.length > 0) {
            const links = {
              linkedIn: socialLinks.linkedIn,
              twitter: socialLinks.twitter,
              youtube: socialLinks.youtube,
              spotify: socialLinks.spotify,
              anandCircle: socialLinks.anandCircle
            };
            
            socialLinksData.forEach(link => {
              const platform = link.platform.toLowerCase();
              if (platform === 'linkedin') links.linkedIn = ensureHttpProtocol(link.url);
              if (platform === 'twitter') links.twitter = ensureHttpProtocol(link.url);
              if (platform === 'youtube') links.youtube = ensureHttpProtocol(link.url);
              if (platform === 'spotify') links.spotify = ensureHttpProtocol(link.url);
              if (platform === 'anandcircle') links.anandCircle = link.url;
            });
            
            setSocialLinks(links);
          }
        } catch (error) {
          console.error("Error loading social links from Supabase:", error);
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();

    const pulseInterval = setInterval(() => {
      setIsAvatarPulsing(prev => !prev);
    }, 2000);

    const connectionInterval = setInterval(() => {
      setShowConnectionEffect(prev => !prev);
    }, 5000);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(connectionInterval);
    };
  }, [loadingAttempts]);

  const handleAvatarHover = () => {
    setShowAvatarHint(true);
    setShowConnectionEffect(true);
  };

  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
    setTimeout(() => {
      setShowConnectionEffect(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="relative z-10">
        <ProfileImageDisplay profileImage={profileImage} isLoading={isLoading} />
      </div>
      
      {showConnectionEffect && (
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          <div className="absolute top-[30%] left-[35%] w-16 h-16 rounded-full bg-primary/10 animate-pulse blur-lg"></div>
        </div>
      )}
      
      <AvatarDialog 
        isAvatarPulsing={isAvatarPulsing}
        showAvatarHint={showAvatarHint}
        showAvatarDialog={showAvatarDialog}
        setShowAvatarDialog={setShowAvatarDialog}
        handleAvatarHover={handleAvatarHover}
        handleAvatarLeave={handleAvatarLeave}
      />
      
      <DecorativeElements />
      
      <SocialMediaLinks links={socialLinks} />
    </div>
  );
};

export default ProfileImage;
