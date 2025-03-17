
import { Users, HeartPulse, Droplet, Brain, GraduationCap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface DomainData {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  initialAngle: number; // We'll use angles for rotation (0-360 degrees)
  link?: string; // Optional link for domains
}

// Position domains evenly spaced around a perfect circle (72 degrees apart)
export const domains: DomainData[] = [
  {
    id: 'family',
    title: 'Nuclear Family',
    icon: Users,
    color: 'rgb(244, 114, 182)', // rose-500
    description: 'Strong families as the cornerstone of society',
    initialAngle: 0, // Top position (12 o'clock)
    link: 'https://www.circleso.com'
  },
  {
    id: 'health',
    title: 'Wellness',
    icon: HeartPulse,
    color: 'rgb(59, 130, 246)', // blue-500
    description: 'Data-driven approaches to optimize wellness',
    initialAngle: 72, // 72 degrees clockwise (about 2:30 position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'water',
    title: 'One Water',
    icon: Droplet,
    color: 'rgb(6, 182, 212)', // cyan-500
    description: 'Integrating technology with environmental sustainability',
    initialAngle: 144, // 144 degrees clockwise (about 5 o'clock position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'ai',
    title: 'AI & Data',
    icon: Brain,
    color: 'rgb(16, 185, 129)', // emerald-500
    description: 'Transforming organizations through innovative technology',
    initialAngle: 216, // 216 degrees clockwise (about 7:30 position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    icon: GraduationCap,
    color: 'rgb(168, 85, 247)', // purple-500
    description: 'Unlocking potential through guidance and development',
    initialAngle: 288, // 288 degrees clockwise (about 10 o'clock position)
    link: 'https://www.circleso.com'
  },
];
