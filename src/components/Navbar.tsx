
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Linkedin, Twitter, Youtube, Music, ChevronDown } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

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
      'fixed w-full z-50 transition-all duration-500 ease-in-out',
      isScrolled 
        ? 'py-2 backdrop-blur-lg bg-white/70 dark:bg-black/30 border-b border-white/10 shadow-lg' 
        : 'py-4 bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a 
              href="#" 
              className={cn(
                "font-display font-semibold tracking-tighter transition-all duration-300",
                isScrolled ? "text-xl" : "text-2xl md:text-3xl",
                "text-gradient-primary"
              )}
            >
              HARDEEP ANAND
            </a>
            
            {/* Social Media Icons - Desktop */}
            <div className="ml-4 hidden md:flex items-center space-x-3">
              <div className="flex space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={16} className="hover:scale-110 transition-transform" />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/70 hover:text-primary transition-colors" aria-label="Spotify">
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
                        "text-sm font-medium px-3 py-2 rounded-full transition-colors duration-200",
                        "hover:bg-white/10 hover:text-primary"
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
                    className="ml-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10"
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="rounded-full p-2 text-foreground bg-white/10 backdrop-blur-sm border border-white/20"
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
          <div className="md:hidden neo-glass mt-2 rounded-xl overflow-hidden border border-white/20 shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-white/10 transition-colors duration-200"
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
                  className="w-full justify-center rounded-lg border-white/20 bg-white/5" 
                />
              </div>
              
              {/* Social Media Icons for Mobile */}
              <div className="flex items-center justify-center space-x-6 px-3 py-3 mt-2 border-t border-white/10">
                <a href="https://linkedin.com/in/hardeepanand" target="_blank" rel="noopener noreferrer" 
                   className="text-foreground/80 hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/80 hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com/@hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/80 hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="https://open.spotify.com/user/hardeepanand" target="_blank" rel="noopener noreferrer"
                   className="text-foreground/80 hover:text-primary transition-colors" aria-label="Spotify">
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
