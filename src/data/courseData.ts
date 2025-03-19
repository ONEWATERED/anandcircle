
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
    title: 'Prompt Engineering',
    description: 'Master the art of crafting effective prompts for AI models. Learn advanced techniques to consistently achieve high-quality outputs tailored to your specific use cases.',
    difficulty: 'Intermediate' as const,
    duration: '6 weeks',
    students: '120+',
    color: 'from-purple-600 to-indigo-500'
  },
  {
    id: 'applied-ai',
    title: 'Applied AI',
    description: 'Understand key AI concepts and implement practical AI solutions in your organization. No coding experience required - focused on real-world business applications.',
    difficulty: 'Beginner' as const,
    duration: '8 weeks',
    students: '180+',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'data-certification',
    title: 'Data Systems Certification',
    description: 'Comprehensive training on data management, analytics and system integration. Learn to design, implement and maintain efficient data ecosystems for modern enterprises.',
    difficulty: 'Beginner' as const,
    duration: '4 weeks',
    students: '150+',
    color: 'from-emerald-500 to-teal-400'
  }
];
