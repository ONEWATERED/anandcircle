
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { getUserProfileData } from '@/utils/profileImages';
import { ensureHttpProtocol } from '@/utils/databaseConnection';
import { ArrowRight } from 'lucide-react';

const ProfileShowcase = () => {
  const [profileData, setProfileData] = useState({
    profileImageUrl: null,
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
            profileImageUrl: data.photoUrl || null,
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
    <section id="profile-section" className="relative py-16 md:py-24 overflow-hidden">
      {/* Full screen background image */}
      {profileData.profileImageUrl && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/50 z-10"></div>
          <img 
            src={profileData.profileImageUrl} 
            alt="Profile Background" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Text content */}
            <motion.div 
              className={`flex-1 space-y-6 text-center lg:text-left ${profileData.profileImageUrl ? 'text-white' : 'text-slate-900'}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-semibold mb-2">
                Hardeep Anand
              </h2>
              <p className={`text-xl md:text-2xl font-light ${profileData.profileImageUrl ? 'text-gray-200' : 'text-slate-600'} mb-4`}>
                Executive • Innovator • Mentor
              </p>
              <div className={`h-1 w-20 md:w-32 ${profileData.profileImageUrl ? 'bg-white/70' : 'bg-gradient-to-r from-primary/70 to-secondary/70'} mx-auto lg:mx-0 my-6`}></div>
              <p className={`${profileData.profileImageUrl ? 'text-gray-100' : 'text-slate-700'} text-lg max-w-2xl mx-auto lg:mx-0`}>
                Bringing data-driven solutions to public service, health challenges, and community needs.
                Connect with me on social platforms to explore collaborations and stay updated on my latest initiatives.
              </p>
              
              <div className="pt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a 
                  href="#story" 
                  className={`inline-flex items-center gap-2 px-6 py-3 ${profileData.profileImageUrl ? 'bg-white text-slate-900 hover:bg-gray-100' : 'bg-slate-900 text-white hover:bg-slate-800'} rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg`}
                >
                  <span>Explore My Story</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#passions" 
                  className={`inline-flex items-center gap-2 px-6 py-3 ${profileData.profileImageUrl ? 'bg-transparent text-white border border-white/30 hover:bg-white/10' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'} rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md`}
                >
                  <span>My Areas of Interest</span>
                </a>
              </div>
              
              {/* Social Media Links */}
              {!isLoading && (
                <div className="pt-6">
                  <SocialMediaLinks 
                    links={profileData.socialLinks} 
                    iconColor={profileData.profileImageUrl ? 'text-white' : 'text-slate-700'} 
                    hoverColor={profileData.profileImageUrl ? 'hover:text-white/80' : 'hover:text-primary'} 
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileShowcase;
