
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Linkedin, Twitter, Youtube, Music, ChevronDown } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

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
        ? 'py-2 backdrop-blur-md bg-white/90 border-b border-gray-200/30 shadow-sm' 
        : 'py-4 bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a 
              href="#" 
              className={cn(
                "font-medium tracking-tight transition-all duration-300",
                isScrolled ? "text-xl" : "text-2xl md:text-3xl",
                "text-foreground hover:text-primary"
              )}
            >
              HARDEEP ANAND
            </a>
            
            {/* Social Media Icons - Desktop */}
            <div className="ml-4 hidden md:flex items-center space-x-3">
              <div className="flex space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200/50 shadow-sm">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="Spotify">
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
                        "hover:bg-primary/10 hover:text-primary"
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
                    className="ml-2 border-gray-200 rounded-md hover:border-primary/30 hover:bg-primary/5"
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="rounded-md p-2 text-foreground bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
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
          <div className="md:hidden bg-white rounded-lg mt-2 border border-gray-200/50 shadow-md overflow-hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2.5 rounded-md text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Resume Button for Mobile */}
              <div className="px-2 py-2">
                <ResumeButton 
                  variant="outline" 
                  size="default" 
                  className="w-full justify-center rounded-md border-gray-200" 
                />
              </div>
              
              {/* Social Media Icons for Mobile */}
              <div className="flex items-center justify-center space-x-6 px-3 py-3 mt-2 border-t border-gray-200/50">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors" aria-label="Spotify">
                  <Music size={20} />
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
