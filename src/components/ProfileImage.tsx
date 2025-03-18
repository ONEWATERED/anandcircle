
import React, { useState, useEffect } from 'react';
import SocialMediaLinks from './profile/SocialMediaLinks';
import AvatarDialog from './profile/AvatarDialog';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import { supabase } from '@/integrations/supabase/client';
import { ensureHttpProtocol } from '@/utils/databaseConnection';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });

  // Detect iOS devices
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);

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
          setProfileImage(profileData.photo_url);
          localStorage.setItem('profileImageUrl', profileData.photo_url);
        } else {
          // If we can't get from database, try localStorage or fallback to default
          const cachedImageUrl = localStorage.getItem('profileImageUrl');
          setProfileImage(cachedImageUrl || '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
        }
        
        // Load social links
        try {
          const { data: socialLinksData, error } = await supabase
            .from('personal_social_links')
            .select('platform, url')
            .eq('profile_id', 'hardeep');
            
          if (!error && socialLinksData && socialLinksData.length > 0) {
            const links = { ...socialLinks };
            
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
  }, [isIOS]);

  const handleAvatarHover = () => {
    setShowAvatarHint(true);
  };

  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
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
