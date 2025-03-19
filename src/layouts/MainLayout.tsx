
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLink from '@/components/AdminLink';
import ScrollToTopButton from '@/components/ScrollToTopButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
    
    return () => {
      document.head.removeChild(pinyonScript);
      document.head.removeChild(interFont);
      document.head.removeChild(jakartaFont);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col bg-white text-slate-900 overflow-hidden" 
    >
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <div className="flex justify-end p-2 border-t border-gray-200 relative z-[2] bg-white">
        <AdminLink />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
