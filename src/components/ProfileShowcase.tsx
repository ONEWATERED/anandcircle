
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { getUserProfileData } from '@/utils/profileImages';
import { ensureHttpProtocol } from '@/utils/databaseConnection';

const ProfileShowcase = () => {
  const [profileData, setProfileData] = useState({
    imageUrl: '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png',
    socialLinks: {
      linkedIn: 'https://linkedin.com/in/hardeepanand',
      twitter: 'https://twitter.com/hardeepanand',
      youtube: 'https://youtube.com/@hardeepanand',
      spotify: 'https://open.spotify.com/user/hardeepanand',
      anandCircle: '#anand-circle'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getUserProfileData();
        if (data) {
          setProfileData({
            imageUrl: data.imageUrl || profileData.imageUrl,
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || profileData.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || profileData.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || profileData.socialLinks.youtube),
              spotify: ensureHttpProtocol(data.socialLinks?.spotify || profileData.socialLinks.spotify),
              anandCircle: data.socialLinks?.anandCircle || profileData.socialLinks.anandCircle
            }
          });
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile image with decorative elements */}
            <div className="w-full max-w-xs relative">
              <div className="aspect-square relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <ProfileImageDisplay 
                  profileImage={profileData.imageUrl} 
                  isLoading={isLoading} 
                />
              </div>
              
              {/* Social media links */}
              <SocialMediaLinks links={profileData.socialLinks} />
              
              {/* Decorative elements */}
              <div className="absolute -z-10 w-full h-full top-6 -left-6 bg-gradient-to-br from-primary/20 to-secondary/30 rounded-xl blur-sm"></div>
              <div className="absolute -z-10 w-full h-full -top-6 left-6 bg-gradient-to-tr from-secondary/30 to-accent/20 rounded-xl blur-sm"></div>
            </div>
            
            {/* Text content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
                  Hardeep Anand
                </h2>
                <p className="text-xl md:text-2xl font-light text-slate-600 mb-4">
                  Executive • Innovator • Mentor
                </p>
                <div className="h-1 w-20 md:w-32 bg-gradient-to-r from-primary to-secondary mx-auto md:mx-0 my-6"></div>
                <p className="text-slate-700 max-w-2xl">
                  Bringing data-driven solutions to public service, health challenges, and community needs.
                  Connect with me on social platforms to explore collaborations and stay updated on my latest initiatives.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileShowcase;
