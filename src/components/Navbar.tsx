
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Linkedin, Twitter, Youtube, Music, FileText } from 'lucide-react';
import ResumeButton from './ResumeButton';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'My Story', href: '#story' },
  { name: 'Passions', href: '#passions' },
  { name: 'Connect', href: '#connect' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed w-full z-50 transition-all duration-300 ease-in-out',
      isScrolled ? 'glass py-3' : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-xl md:text-2xl font-display font-semibold tracking-tight text-foreground"
            >
              HARDEEP ANAND
            </a>
            
            {/* Social Media Icons */}
            <div className="ml-4 hidden md:flex items-center space-x-3">
              <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                 className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                 className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                 className="text-foreground/70 hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                 className="text-foreground/70 hover:text-primary transition-colors" aria-label="Spotify">
                <Music size={18} />
              </a>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            
            {/* Resume Button */}
            <ResumeButton 
              variant="ghost" 
              showIcon={true} 
              className="text-sm font-medium text-foreground/80 hover:text-primary"
            />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass mt-2 rounded-2xl overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/50 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Resume Button for Mobile */}
              <div className="px-3 py-2">
                <ResumeButton 
                  variant="outline" 
                  size="default" 
                  className="w-full justify-center" 
                  onClick={() => setMobileMenuOpen(false)}
                />
              </div>
              
              {/* Social Media Icons for Mobile */}
              <div className="flex items-center space-x-4 px-3 py-3 border-t border-gray-200/30 mt-2">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="Spotify">
                  <Music size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
