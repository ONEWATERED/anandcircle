
import { ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: string;
  color: string;
  icon?: ReactNode; // Optional icon property
}

export const courses = [
  {
    id: 'prompt-engineering',
    title: 'AI Prompt Engineering Mastery',
    description: 'Master the art of crafting effective prompts for different AI models. Learn advanced techniques to get consistently high-quality outputs for your specific use cases.',
    difficulty: 'Intermediate' as const,
    duration: '6 weeks',
    students: '120+',
    color: 'from-purple-600 to-indigo-500'
  },
  {
    id: 'ai-foundations',
    title: 'Applied AI for Professionals',
    description: 'Understand key AI concepts and learn how to implement AI solutions in your organization. No coding experience required - focus on practical applications.',
    difficulty: 'Beginner' as const,
    duration: '8 weeks',
    students: '180+',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'notion-mastery',
    title: 'Notion System Design',
    description: 'Build powerful knowledge management systems in Notion. Learn to create databases, automate workflows, and design systems that scale with your needs.',
    difficulty: 'Beginner' as const,
    duration: '4 weeks',
    students: '150+',
    color: 'from-emerald-500 to-teal-400'
  }
];
