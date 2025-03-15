import { Users, Heart, Dog } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  icon: LucideIcon;
  color: string;
  bio: string;
  photoUrl?: string;
  initialAngle: number;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

// Keep only the four family members, positioned evenly around the circle
export const familyMembers: FamilyMember[] = [
  {
    id: 'spouse',
    name: 'Sarah',
    role: 'Spouse',
    icon: Heart,
    color: "rgb(244, 114, 182)", // rose-500
    bio: "Sarah is a pediatrician with a passion for children's healthcare. She loves hiking and photography in her free time.",
    initialAngle: 0, // Top position (12 o'clock)
    socialLinks: {
      twitter: "https://twitter.com/sarah",
      instagram: "https://instagram.com/sarah",
      linkedin: "https://linkedin.com/in/sarah"
    }
  },
  {
    id: 'son',
    name: 'Alex',
    role: 'Son',
    icon: Users,
    color: "rgb(59, 130, 246)", // blue-500
    bio: "Alex is 14 years old and loves playing soccer. He's also interested in computer programming and video games.",
    initialAngle: 90, // Right position (3 o'clock)
    socialLinks: {
      instagram: "https://instagram.com/alex",
      facebook: "https://facebook.com/alex"
    }
  },
  {
    id: 'daughter',
    name: 'Emma',
    role: 'Daughter',
    icon: Users,
    color: "rgb(168, 85, 247)", // purple-500
    bio: "Emma is 10 years old and enjoys art, reading, and playing the piano. She wants to be a veterinarian when she grows up.",
    initialAngle: 180, // Bottom position (6 o'clock)
    socialLinks: {
      instagram: "https://instagram.com/emma"
    }
  },
  {
    id: 'spark',
    name: 'Spark',
    role: 'Pet Dog',
    icon: Dog,
    color: "rgb(16, 185, 129)", // emerald-500
    bio: "Spark is a 3-year-old Golden Retriever who loves catching frisbees, swimming, and going on family hikes. He's extremely playful and protective of the family.",
    initialAngle: 270, // Left position (9 o'clock)
    socialLinks: {
      instagram: "https://instagram.com/spark_dog"
    }
  }
];
