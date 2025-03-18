
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Linkedin, Twitter, Youtube, Music } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'My Story', href: '#story' },
  { name: 'My Interests', href: '#passions' },
  { name: 'Articles', href: '#articles' },
  { name: 'Connect', href: '#connect' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
      isScrolled 
        ? 'py-2 bg-[#0F172A]/90 backdrop-blur-md border-b border-primary/10 shadow-md' 
        : 'py-3 md:py-4 bg-transparent'
    )}>
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a 
              href="#" 
              className={cn(
                "font-medium tracking-tight transition-all duration-300",
                isScrolled ? "text-lg md:text-xl" : "text-xl md:text-3xl",
                "text-white hover:text-primary"
              )}
            >
              HARDEEP ANAND
            </a>
            
            {/* Social Media Icons - Desktop */}
            <div className="ml-3 md:ml-4 hidden md:flex items-center space-x-2 md:space-x-3">
              <div className="flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-white/10 shadow-sm">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="Spotify">
                  <Music size={16} className="hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink 
                      href={link.href}
                      className={cn(
                        "text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200",
                        "text-gray-300 hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                {/* Resume Button */}
                <NavigationMenuItem>
                  <ResumeButton 
                    variant="outline" 
                    size="sm"
                    showIcon={true} 
                    className="ml-2 border-gray-700 rounded-md hover:border-primary/30 hover:bg-primary/5 text-gray-300"
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="rounded-md p-1.5 text-white bg-black/30 backdrop-blur-sm border border-white/10 shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-lg rounded-lg mt-2 border border-primary/10 shadow-md overflow-hidden animate-fade-in">
            <div className="p-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Resume Button for Mobile */}
              <div className="px-1.5 py-2">
                <ResumeButton 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-center rounded-md border-gray-700 text-gray-300 text-sm" 
                />
              </div>
              
              {/* Social Media Icons for Mobile */}
              <div className="flex items-center justify-center space-x-5 px-3 py-2 mt-1 border-t border-white/10">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors" aria-label="Spotify">
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
