
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Image, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal
} from '@/components/ui/drawer';

interface SideNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNavMenu: React.FC<SideNavMenuProps> = ({ isOpen, onClose }) => {
  const navLinks = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <Home className="h-6 w-6 text-[#8B5CF6]" /> 
    },
    { 
      name: 'Gallery', 
      path: '/gallery', 
      icon: <Image className="h-6 w-6 text-[#0EA5E9]" /> 
    },
    { 
      name: 'Domains', 
      path: '/#passions', 
      icon: <Briefcase className="h-6 w-6 text-[#F59E0B]" /> 
    },
    { 
      name: 'Publications', 
      path: '/#publications', 
      icon: <BookOpen className="h-6 w-6 text-[#EC4899]" /> 
    },
    { 
      name: 'Courses', 
      path: '/#courses', 
      icon: <GraduationCap className="h-6 w-6 text-[#10B981]" /> 
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-white dark:bg-black rounded-l-2xl shadow-lg z-50 overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gradient-primary">Navigation</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <nav className="flex-1">
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center py-3 px-4 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-primary/10 text-primary font-medium scale-105 shadow-sm' 
                              : 'hover:bg-gray-100 dark:hover:bg-white/10'
                          }`
                        }
                      >
                        <div className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-black shadow-sm">
                          {link.icon}
                        </div>
                        <span className="text-lg">{link.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full text-primary border-primary hover:bg-primary hover:text-white"
                  onClick={() => {
                    window.open('https://www.circleso.com', '_blank', 'noopener,noreferrer');
                    onClose();
                  }}
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Join Circle
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideNavMenu;
