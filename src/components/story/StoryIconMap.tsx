
import React from 'react';
import { 
  GraduationCap,
  Briefcase,
  Shield,
  Droplets,
  Lightbulb,
  Globe,
  Star,
  Milestone
} from 'lucide-react';

interface IconMapType {
  [key: string]: React.ComponentType<any>;
}

// Map icon names to Lucide icon components
export const iconMap: IconMapType = {
  'GraduationCap': GraduationCap,
  'Briefcase': Briefcase,
  'Shield': Shield, 
  'Droplets': Droplets,
  'Lightbulb': Lightbulb,
  'Globe': Globe,
  'Star': Star,
  'Milestone': Milestone // fallback
};

// Helper function to render a specific icon based on icon name
export const renderIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || iconMap.Milestone;
  return <IconComponent className="h-5 w-5 text-[#0EA5E9]" />;
};

export default renderIcon;
