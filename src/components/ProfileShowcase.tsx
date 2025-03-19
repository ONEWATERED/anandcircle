
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
    <section id="profile-section" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Profile image with decorative elements */}
            <div className="w-full max-w-md lg:w-2/5 relative">
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <ProfileImageDisplay 
                    profileImage={profileData.imageUrl} 
                    isLoading={isLoading} 
                  />
                </div>
                
                {/* Social media links */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-600 mb-3">Connect With Me</h4>
                  <SocialMediaLinks links={profileData.socialLinks} />
                </div>
              </motion.div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute -z-10 w-full h-full -bottom-6 -right-6 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl"></div>
              <div className="absolute -z-10 w-full h-full -top-6 -left-6 bg-gradient-to-tr from-secondary/20 to-accent/10 rounded-2xl"></div>
            </div>
            
            {/* Text content */}
            <motion.div 
              className="flex-1 space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-2">
                Hardeep Anand
              </h2>
              <p className="text-xl md:text-2xl font-light text-slate-600 mb-4">
                Executive • Innovator • Mentor
              </p>
              <div className="h-1 w-20 md:w-32 bg-gradient-to-r from-primary/70 to-secondary/70 mx-auto lg:mx-0 my-6"></div>
              <p className="text-slate-700 text-lg max-w-2xl mx-auto lg:mx-0">
                Bringing data-driven solutions to public service, health challenges, and community needs.
                Connect with me on social platforms to explore collaborations and stay updated on my latest initiatives.
              </p>
              
              <div className="pt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a 
                  href="#story" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Explore My Story</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#passions" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <span>My Areas of Interest</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Add missing import
import { ArrowRight } from 'lucide-react';

export default ProfileShowcase;
