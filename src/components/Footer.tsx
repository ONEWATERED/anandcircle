
import React from 'react';

const Footer = () => {
  return (
    <footer id="connect" className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4">Hardeep Anand</h4>
            <p className="text-muted-foreground mb-4">
              Executive, innovator, and mentor focused on the intersection of technology, health, and community.
            </p>
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
                <a href="#passions" className="text-muted-foreground hover:text-primary transition-colors">Areas of Focus</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Articles</a>
              </li>
            </ul>
          </div>
          
          {/* Areas of Focus */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4">Areas of Focus</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health & Wellness</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mentoring & Coaching</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Data & Technology</a>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-4">Connect</h4>
            <p className="text-muted-foreground mb-4">
              Join my Circle community for deeper insights and connections.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-4 font-medium tracking-wide text-white transition duration-200 rounded-full bg-primary hover:bg-primary/90"
            >
              Join the Community
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Hardeep Anand. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
