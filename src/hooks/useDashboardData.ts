
import { useState, useEffect } from 'react';
import { getProfileImage, getUserProfileData, checkDatabaseConnection } from '@/utils/imageLoader';
import { SocialLinksFormValues } from '@/components/dashboard/social/SocialLinksForm';
import { toast } from 'sonner';

export interface DashboardData {
  profileImageUrl: string;
  resumeUrl: string;
  socialLinks: SocialLinksFormValues;
  isDatabaseConnected: boolean;
  isLoading: boolean;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>({
    profileImageUrl: '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png',
    resumeUrl: '',
    socialLinks: {
      linkedInUrl: 'https://linkedin.com/in/hardeepanand',
      twitterUrl: 'https://x.com/HardeepAnandd',
      youtubeUrl: 'https://youtube.com/@hardeepanand',
      spotifyUrl: '', // Keep this for backward compatibility with the form
      anandCircleUrl: '#anand-circle',
    },
    isDatabaseConnected: false,
    isLoading: true
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check database connection
        const isConnected = await checkDatabaseConnection();
        
        // Load profile image
        const savedImage = await getProfileImage();
        
        // Load resume URL
        const savedResumeUrl = localStorage.getItem('resumeUrl') || '';

        // Load profile data and social links
        const userData = await getUserProfileData();
        
        setData({
          profileImageUrl: savedImage || '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png',
          resumeUrl: savedResumeUrl,
          socialLinks: userData?.socialLinks ? {
            linkedInUrl: userData.socialLinks.linkedIn,
            twitterUrl: userData.socialLinks.twitter,
            youtubeUrl: userData.socialLinks.youtube,
            spotifyUrl: '', // Keep this for backward compatibility with the form
            anandCircleUrl: userData.socialLinks.anandCircle,
          } : data.socialLinks,
          isDatabaseConnected: isConnected,
          isLoading: false
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load user data");
        setData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUserData();
  }, []);

  return data;
};
