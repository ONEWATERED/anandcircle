
import React from 'react';
import OneWaterPromo from './OneWaterPromo';
import ResumeButton from './ResumeButton';
import { FileText, ExternalLink, Heart } from 'lucide-react';
import NewsletterSubscription from './NewsletterSubscription';

const Footer = () => {
  return (
    <footer id="connect">
      <OneWaterPromo />
      
      {/* Main Footer Content */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4">HARDEEP ANAND</h4>
              <p className="text-muted-foreground mb-4">
                Executive, innovator, and mentor focused on the intersection of technology, health, and community.
              </p>
              
              {/* Resume Button */}
              <ResumeButton variant="outline" />
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
                </li>
                <li>
                  <a href="#story" className="text-muted-foreground hover:text-primary transition-colors">My Story</a>
                </li>
                <li>
                  <a href="#passions" className="text-muted-foreground hover:text-primary transition-colors">My Interests</a>
                </li>
                <li>
                  <a href="#articles" className="text-muted-foreground hover:text-primary transition-colors">Articles</a>
                </li>
                <li>
                  <a href="#digital-clone" className="text-muted-foreground hover:text-primary transition-colors">Digital Clone</a>
                </li>
                <li>
                  <a href="#interest-form" className="text-muted-foreground hover:text-primary transition-colors">Create Your Own</a>
                </li>
              </ul>
            </div>
            
            {/* One Water Initiatives */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4">One Water Initiatives</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.onewater.foundation" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    One Water Foundation
                  </a>
                </li>
                <li>
                  <a href="https://www.onewater.ai" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    One Water AI
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4">Connect</h4>
              <p className="text-muted-foreground mb-4">
                Join our community for deeper insights and connections.
              </p>
              <a
                href="https://www.circleso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 px-4 font-medium tracking-wide text-white transition duration-200 rounded-full bg-primary hover:bg-primary/90 w-full mb-3"
              >
                Join the One Water Circle
              </a>
              <NewsletterSubscription />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HARDEEP ANAND. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
