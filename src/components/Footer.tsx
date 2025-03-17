
import React from 'react';
import OneWaterPromo from './OneWaterPromo';
import ResumeButton from './ResumeButton';
import { FileText, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="connect">
      <OneWaterPromo />
      
      {/* One Water Foundation Donation Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 py-4">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-center text-white">
            <Heart className="h-6 w-6 mr-2 animate-pulse" />
            <p className="text-center font-medium">
              <span className="font-bold">100% of all proceeds</span> from this website go to 
              <a href="https://www.onewater.foundation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline font-bold hover:text-blue-100 transition-colors ml-1">
                One Water Foundation
              </a>
            </p>
          </div>
        </div>
      </div>
      
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
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <FileText className="mr-2 h-4 w-4" />
                    Resume/CV
                  </a>
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
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">One Water Academy</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">One Water AI</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">One Water</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health & Wellness</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">AI & Data Innovation</a>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4">Connect</h4>
              <p className="text-muted-foreground mb-4">
                Join my community for deeper insights and connections.
              </p>
              <a
                href="#anand-circle"
                className="inline-flex items-center justify-center h-10 px-4 font-medium tracking-wide text-white transition duration-200 rounded-full bg-primary hover:bg-primary/90"
              >
                Join the Community
              </a>
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
