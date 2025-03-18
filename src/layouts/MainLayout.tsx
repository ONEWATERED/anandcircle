
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
    
    // Simplified intersection observer - only observes elements without animating them
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is in the viewport, add visible class without animation
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    // Get elements with the opacity-0 class
    const elements = document.querySelectorAll('.opacity-0');
    
    // Observe each element
    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <div className="flex justify-end p-2 border-t">
        <AdminLink />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
