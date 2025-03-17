
export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: string;
  color: string;
  icon?: React.ReactNode; // Optional icon property
}

export const courses = [
  {
    id: 'data-fundamentals',
    title: 'Data Fundamentals',
    description: 'Master the essentials of data analysis, visualization, and interpretation. Learn to transform raw data into actionable insights.',
    difficulty: 'Beginner' as const,
    duration: '4 weeks',
    students: '250+',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'Understand the core concepts of artificial intelligence and machine learning. Build your first AI models with hands-on projects.',
    difficulty: 'Intermediate' as const,
    duration: '6 weeks',
    students: '180+',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Mastery',
    description: 'Learn advanced techniques to craft effective prompts for large language models. Maximize AI outputs for your specific needs.',
    difficulty: 'Advanced' as const,
    duration: '5 weeks',
    students: '120+',
    color: 'from-emerald-500 to-teal-400'
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Create compelling visual narratives with data. Learn to use modern visualization tools to communicate insights effectively.',
    difficulty: 'Intermediate' as const,
    duration: '5 weeks',
    students: '210+',
    color: 'from-amber-500 to-orange-400'
  },
  {
    id: 'llm-development',
    title: 'LLM Development',
    description: 'Develop and fine-tune large language models for specific business applications and use cases.',
    difficulty: 'Advanced' as const,
    duration: '8 weeks',
    students: '90+',
    color: 'from-indigo-500 to-violet-400'
  }
];
