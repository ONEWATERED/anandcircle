
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Domains', path: '/#passions' },
    { name: 'Courses', path: '/#courses' },
  ];
  
  return (
    <nav className={`fixed top-0 left-0 right-0 py-4 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/80 shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            {/* Removed the HARDEEP text from here */}
          </NavLink>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium ${isActive ? 'text-primary' : 'text-slate-700 hover:text-primary'} transition-colors`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-primary border-primary hover:bg-primary hover:text-white"
              onClick={() => window.open('https://www.circleso.com', '_blank', 'noopener,noreferrer')}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Join Circle
            </Button>
          </div>
          
          <button 
            className="md:hidden block text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-20 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium text-lg ${isActive ? 'text-primary' : 'text-slate-700'}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              
              <Button 
                variant="outline" 
                className="mt-4 w-full text-primary border-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  window.open('https://www.circleso.com', '_blank', 'noopener,noreferrer');
                  setIsOpen(false);
                }}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Join Circle
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
