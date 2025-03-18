
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLink from '@/components/AdminLink';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import OneWaterPromo from '@/components/OneWaterPromo';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Load Pinyon Script font for signature
  useEffect(() => {
    // Add Pinyon Script font for signature
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Add Inter font for main typography
    const interFont = document.createElement('link');
    interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    interFont.rel = 'stylesheet';
    document.head.appendChild(interFont);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(interFont);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col bg-tech-dark text-foreground" 
    >
      <OneWaterPromo />
      <Navbar />
      <main className="flex-grow w-full bg-gradient-to-b from-tech-dark to-[#131c32]">
        {children}
      </main>
      <div className="flex justify-end p-2 border-t border-primary/20 relative z-[2]">
        <AdminLink />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
