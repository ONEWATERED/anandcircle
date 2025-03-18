
import React, { useState, useEffect } from 'react';
import { PersonalProfile } from '@/types/thought-leaders';
import SocialMediaLinks from './profile/SocialMediaLinks';
import AvatarDialog from './profile/AvatarDialog';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import DecorativeElements from './profile/DecorativeElements';
import { supabase } from '@/integrations/supabase/client';
import { ensureHttpProtocol } from '@/utils/databaseConnection';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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
        // First try to get directly from personal_profile table
        const { data: profileData, error } = await supabase
          .from('personal_profile')
          .select('photo_url, name')
          .eq('id', 'hardeep')
          .single();
          
        if (!error && profileData?.photo_url) {
          console.log('Found profile image in database:', profileData.photo_url);
          setProfileImage(profileData.photo_url);
          localStorage.setItem('profileImageUrl', profileData.photo_url);
        } else {
          // If we can't get from database, try localStorage
          const cachedImageUrl = localStorage.getItem('profileImageUrl');
          
          if (cachedImageUrl) {
            console.log('Using cached profile image:', cachedImageUrl);
            setProfileImage(cachedImageUrl);
          } else {
            // Use default if nothing else is available
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
        console.error("Error loading profile data:", error);
        // Use default image as fallback
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleAvatarHover = () => {
    setShowAvatarHint(true);
  };

  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
  };

  return (
    <div className="relative my-4 max-w-xs mx-auto md:mx-0">
      <div className="relative w-full">
        <ProfileImageDisplay profileImage={profileImage} isLoading={isLoading} />
      </div>
      
      <AvatarDialog 
        isAvatarPulsing={false}
        showAvatarHint={showAvatarHint}
        showAvatarDialog={showAvatarDialog}
        setShowAvatarDialog={setShowAvatarDialog}
        handleAvatarHover={handleAvatarHover}
        handleAvatarLeave={handleAvatarLeave}
      />
      
      <SocialMediaLinks links={socialLinks} />
    </div>
  );
};

export default ProfileImage;
