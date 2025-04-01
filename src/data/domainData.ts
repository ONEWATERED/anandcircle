
import { Users, HeartPulse, Droplet, Brain, GraduationCap, Database } from 'lucide-react';
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
    id: 'water',
    title: 'One Water',
    icon: Droplet,
    color: 'rgb(6, 182, 212)', // cyan-500
    description: 'I work on creating a world where clean water flows for everyone through innovative technology and community engagement.',
    initialAngle: 0, // Top position (12 o'clock)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'ai',
    title: 'AI & Innovation',
    icon: Brain,
    color: 'rgb(16, 185, 129)', // emerald-500
    description: 'I love bringing AI to solve real-world problems in creative ways that make a positive impact on communities.',
    initialAngle: 72, // 72 degrees clockwise (about 2:30 position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: Database,
    color: 'rgb(139, 92, 246)', // violet-500
    description: 'I enjoy turning complex data into meaningful insights that help people make better decisions in their everyday lives.',
    initialAngle: 144, // 144 degrees clockwise (about 5 o'clock position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    icon: GraduationCap,
    color: 'rgb(168, 85, 247)', // purple-500
    description: 'I\'m passionate about helping others discover their potential through guidance and sharing what I\'ve learned along my journey.',
    initialAngle: 216, // 216 degrees clockwise (about 7:30 position)
    link: 'https://www.circleso.com'
  },
  {
    id: 'family',
    title: 'Nuclear Family',
    icon: Users,
    color: 'rgb(244, 114, 182)', // rose-500
    description: 'I believe in nurturing strong family connections as the foundation for healthy communities and personal wellbeing.',
    initialAngle: 288, // 288 degrees clockwise (about 10 o'clock position)
    link: 'https://www.circleso.com'
  },
  {
    id: 'health',
    title: 'Wellness',
    icon: HeartPulse,
    color: 'rgb(59, 130, 246)', // blue-500
    description: 'I focus on making health simple and achievable for everyone through holistic approaches to physical and mental wellbeing.',
    initialAngle: 360, // 360 degrees clockwise (back to 12 o'clock)
    link: 'https://www.onewater.ai'
  }
];
