
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLink from '@/components/AdminLink';
import ScrollToTopButton from '@/components/ScrollToTopButton';

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
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground" style={{ backgroundColor: '#0F172A', color: '#f8fafc' }}>
      <Navbar />
      <main className="flex-grow relative w-full">{children}</main>
      <div className="flex justify-end p-2 border-t relative z-[2]">
        <AdminLink />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
