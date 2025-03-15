
import { Users, HeartPulse, Droplet, Brain, GraduationCap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface DomainData {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  x: number;
  y: number;
}

// Domain definitions with the five domains positioned for perfect symmetry in a pentagon
// Using precise trigonometric calculations for exact positioning
export const domains: DomainData[] = [
  {
    id: 'family',
    title: 'Nuclear Families',
    icon: Users,
    color: 'rgb(244, 114, 182)', // rose-500
    description: 'Strong families as the cornerstone of society',
    x: 0, // Top position (12 o'clock)
    y: -1,
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: HeartPulse,
    color: 'rgb(59, 130, 246)', // blue-500
    description: 'Data-driven approaches to optimize wellness',
    x: 0.9511, // Right-top position (72° from top) - cos(72°), sin(72°)
    y: -0.309,
  },
  {
    id: 'mentoring',
    title: 'Coaching & Mentoring',
    icon: GraduationCap,
    color: 'rgb(168, 85, 247)', // purple-500
    description: 'Unlocking potential through guidance and development',
    x: 0.5878, // Right-bottom position (144° from top) - cos(144°), sin(144°)
    y: 0.809,
  },
  {
    id: 'water',
    title: 'One Water',
    icon: Droplet,
    color: 'rgb(6, 182, 212)', // cyan-500
    description: 'Integrating technology with environmental sustainability',
    x: -0.5878, // Left-bottom position (216° from top) - cos(216°), sin(216°)
    y: 0.809,
  },
  {
    id: 'ai',
    title: 'AI & Data Innovation',
    icon: Brain,
    color: 'rgb(16, 185, 129)', // emerald-500
    description: 'Transforming organizations through innovative technology',
    x: -0.9511, // Left-top position (288° from top) - cos(288°), sin(288°)
    y: -0.309,
  },
];
