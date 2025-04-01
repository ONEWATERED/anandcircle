
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLink from '@/components/AdminLink';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import SideNavMenu from '@/components/SideNavMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Load fonts for better typography
  useEffect(() => {
    // Add Pinyon Script font for signature
    const pinyonScript = document.createElement('link');
    pinyonScript.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap';
    pinyonScript.rel = 'stylesheet';
    document.head.appendChild(pinyonScript);
    
    // Add Inter font for main typography
    const interFont = document.createElement('link');
    interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    interFont.rel = 'stylesheet';
    document.head.appendChild(interFont);
    
    // Add Plus Jakarta Sans for headings
    const jakartaFont = document.createElement('link');
    jakartaFont.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    jakartaFont.rel = 'stylesheet';
    document.head.appendChild(jakartaFont);
    
    // Add JetBrains Mono for monospace/code text
    const jetBrainsMono = document.createElement('link');
    jetBrainsMono.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap';
    jetBrainsMono.rel = 'stylesheet';
    document.head.appendChild(jetBrainsMono);
    
    return () => {
      document.head.removeChild(pinyonScript);
      document.head.removeChild(interFont);
      document.head.removeChild(jakartaFont);
      document.head.removeChild(jetBrainsMono);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col bg-tech-dark text-white overflow-hidden" 
    >
      <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <main className="flex-grow w-full">
        {children}
      </main>
      <div className="flex justify-end p-2 border-t border-[#0EA5E9]/10 relative z-[2] bg-tech-dark">
        <AdminLink />
      </div>
      <Footer />
      <ScrollToTopButton />
      <SideNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default MainLayout;
