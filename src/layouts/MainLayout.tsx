
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLink from '@/components/AdminLink';
import ScrollToTopButton from '@/components/ScrollToTopButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Intersection Observer for animations
  useEffect(() => {
    // Add Pinyon Script font for signature
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is in the viewport
          if (entry.isIntersecting) {
            // Add the animate class
            entry.target.classList.add('animate-fade-up');
            // Unobserve the element after animating it
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -10% 0px' // Adjust the bottom margin to trigger earlier
      }
    );

    // Get all elements with the opacity-0 class
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
