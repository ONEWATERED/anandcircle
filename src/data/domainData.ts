
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
    description: 'Creating a world where clean water flows for everyone through smarter technology',
    initialAngle: 0, // Top position (12 o'clock)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'ai',
    title: 'AI & Innovation',
    icon: Brain,
    color: 'rgb(16, 185, 129)', // emerald-500
    description: 'Bringing AI magic to solve real problems in fun and creative ways',
    initialAngle: 72, // 72 degrees clockwise (about 2:30 position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: Database,
    color: 'rgb(139, 92, 246)', // violet-500
    description: 'Turning complex data into friendly insights that actually make sense',
    initialAngle: 144, // 144 degrees clockwise (about 5 o'clock position)
    link: 'https://www.onewater.ai'
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    icon: GraduationCap,
    color: 'rgb(168, 85, 247)', // purple-500
    description: 'Helping others discover their superpowers through thoughtful guidance',
    initialAngle: 216, // 216 degrees clockwise (about 7:30 position)
    link: 'https://www.circleso.com'
  },
  {
    id: 'family',
    title: 'Nuclear Family',
    icon: Users,
    color: 'rgb(244, 114, 182)', // rose-500
    description: 'Building happy, connected families as the heart of our communities',
    initialAngle: 288, // 288 degrees clockwise (about 10 o'clock position)
    link: 'https://www.circleso.com'
  },
  {
    id: 'health',
    title: 'Wellness',
    icon: HeartPulse,
    color: 'rgb(59, 130, 246)', // blue-500
    description: 'Making health simple, fun and achievable for everyday life',
    initialAngle: 360, // 360 degrees clockwise (back to 12 o'clock)
    link: 'https://www.onewater.ai'
  },
];
