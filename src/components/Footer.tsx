
import React from 'react';
import OneWaterPromo from './OneWaterPromo';
import ResumeButton from './ResumeButton';
import { FileText, ExternalLink, Heart } from 'lucide-react';
import NewsletterSubscription from './NewsletterSubscription';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer id="connect" className="relative overflow-hidden bg-[#0F172A]">
      <OneWaterPromo />
      
      {/* Main Footer Content */}
      <div className="pt-12 pb-8 border-t border-primary/20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div className="px-4">
              <h4 className="text-lg font-display font-semibold mb-4 text-white">HARDEEP ANAND</h4>
              <p className="text-gray-400 mb-4">
                Executive, innovator, and mentor focused on the intersection of technology, health, and community.
              </p>
              
              {/* Resume Button */}
              <ResumeButton variant="outline" className="border-primary/20 hover:border-primary/40" />
            </div>
            
            {/* Quick Links */}
            <div className="px-4">
              <h4 className="text-lg font-display font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#story" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    My Story
                  </a>
                </li>
                <li>
                  <a href="#digital-clone" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Digital Clone
                  </a>
                </li>
                <li>
                  <a href="#interest-form" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Create Your Own
                  </a>
                </li>
              </ul>
            </div>
            
            {/* One Water Initiatives */}
            <div className="px-4">
              <h4 className="text-lg font-display font-semibold mb-4 text-white">One Water Initiatives</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.onewater.foundation" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#131c32] group-hover:bg-[#1A2235] mr-2 transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </span>
                    One Water Foundation
                  </a>
                </li>
                <li>
                  <a href="https://www.onewater.ai" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center text-gray-400 hover:text-primary transition-colors group">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#131c32] group-hover:bg-[#1A2235] mr-2 transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </span>
                    One Water AI
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div className="px-4">
              <h4 className="text-lg font-display font-semibold mb-4 text-white">Connect</h4>
              <p className="text-gray-400 mb-4">
                Join our community for deeper insights and connections.
              </p>
              <a
                href="https://www.circleso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 px-4 font-medium tracking-wide text-white transition duration-200 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full mb-3"
              >
                Join the One Water Circle
              </a>
              <NewsletterSubscription />
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-4">
            <p>© {new Date().getFullYear()} HARDEEP ANAND. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;
