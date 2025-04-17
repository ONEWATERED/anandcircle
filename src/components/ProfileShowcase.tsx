
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profile';
import { ensureHttpProtocol } from '@/utils/database';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';

const ProfileShowcase = () => {
  const profileImage = '/lovable-uploads/05183678-e904-418e-9248-ee8b96cc5fc1.png';
  
  const [profileData, setProfileData] = useState({
    profileImageUrl: profileImage,
    socialLinks: {
      linkedIn: 'https://linkedin.com/in/hardeepanand',
      twitter: 'https://x.com/HardeepAnandd',
      youtube: 'https://youtube.com/@hardeepanand',
      anandCircle: '#anand-circle'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  console.log("ProfileShowcase: Using profile image:", profileImage);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        console.log("ProfileShowcase: Loading user profile data");
        
        // Get user profile data for social links only
        const data = await getUserProfileData();
        console.log("Raw profile data received:", data);
        
        // Update social links if available
        if (data.socialLinks) {
          setProfileData(prev => ({
            ...prev,
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || prev.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || prev.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || prev.socialLinks.youtube),
              anandCircle: data.socialLinks?.anandCircle || prev.socialLinks.anandCircle
            }
          }));
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen overflow-hidden bg-black" 
    >
      <ProfileBackground />
      
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto flex flex-row items-center justify-center gap-8 py-20 md:py-24">
          {/* Circular Profile Image */}
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-neon-cyan">
            <img 
              src={profileImage}
              alt="Hardeep Anand"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", e);
                e.currentTarget.src = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png'; // Fallback image
              }}
            />
          </div>
          
          <div className="flex flex-col items-start">
            <ProfileHeader />
            <SocialFooter 
              socialLinks={profileData.socialLinks} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
      
      <ScrollPrompt />
    </section>
  );
};

export default ProfileShowcase;
