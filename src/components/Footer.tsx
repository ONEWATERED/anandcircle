
import React from 'react';
import OneWaterPromo from './OneWaterPromo';
import ResumeButton from './ResumeButton';
import { FileText, ExternalLink, Heart } from 'lucide-react';
import NewsletterSubscription from './NewsletterSubscription';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="connect" className="relative overflow-hidden">
      <OneWaterPromo />
      
      {/* Main Footer Content */}
      <div className="bg-gradient-to-b from-gray-50/80 to-gray-100/90 backdrop-blur-sm pt-16 pb-8 border-t border-white/20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 text-gradient-primary">HARDEEP ANAND</h4>
              <p className="text-muted-foreground mb-4">
                Executive, innovator, and mentor focused on the intersection of technology, health, and community.
              </p>
              
              {/* Resume Button */}
              <ResumeButton variant="outline" className="border-primary/20 hover:border-primary/40" />
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 text-gradient-secondary">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#story" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    My Story
                  </a>
                </li>
                <li>
                  <a href="#passions" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    My Interests
                  </a>
                </li>
                <li>
                  <a href="#articles" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Articles
                  </a>
                </li>
                <li>
                  <a href="#digital-clone" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Digital Clone
                  </a>
                </li>
                <li>
                  <a href="#interest-form" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                    Create Your Own
                  </a>
                </li>
              </ul>
            </div>
            
            {/* One Water Initiatives */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 text-gradient-secondary">One Water Initiatives</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.onewater.foundation" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/40 group-hover:bg-white/80 mr-2 transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </span>
                    One Water Foundation
                  </a>
                </li>
                <li>
                  <a href="https://www.onewater.ai" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center text-muted-foreground hover:text-primary transition-colors group">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/40 group-hover:bg-white/80 mr-2 transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </span>
                    One Water AI
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 text-gradient-primary">Connect</h4>
              <p className="text-muted-foreground mb-4">
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
          
          <div className="border-t border-gray-200/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
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
