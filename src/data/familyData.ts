
export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  color: string;
  photoUrl?: string;
  socialLinks?: Record<string, string>;
}

export const familyMembers: FamilyMember[] = [
  {
    id: 'spouse',
    name: 'Emma Anand',
    role: 'Spouse',
    bio: 'Software engineer and loving partner who shares my passion for technology and innovation.',
    color: '#4f46e5',
    socialLinks: {
      twitter: 'https://twitter.com/emma_anand',
      linkedin: 'https://linkedin.com/in/emma-anand'
    }
  },
  {
    id: 'son',
    name: 'Raj Anand',
    role: 'Son',
    bio: 'Curious and energetic, always exploring and learning about the world around him.',
    color: '#0ea5e9',
    socialLinks: {
      instagram: 'https://instagram.com/raj_anand'
    }
  },
  {
    id: 'daughter',
    name: 'Leela Anand',
    role: 'Daughter',
    bio: 'Creative and thoughtful, with a natural talent for art and storytelling.',
    color: '#ec4899',
    socialLinks: {
      youtube: 'https://youtube.com/@leela_anand'
    }
  },
  {
    id: 'spark',
    name: 'Spark',
    role: 'Pet',
    bio: 'Our loyal and playful family dog who brings joy to our everyday life.',
    color: '#f59e0b',
    socialLinks: {
      instagram: 'https://instagram.com/spark_anand_dog'
    }
  }
];
