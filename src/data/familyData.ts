
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
}

// Position family members evenly spaced around a perfect circle (90 degrees apart)
export const familyMembers: FamilyMember[] = [
  {
    id: 'spouse',
    name: 'Sarah',
    role: 'Spouse',
    icon: Heart,
    color: 'rgb(244, 114, 182)', // rose-500
    bio: "Sarah is a pediatrician with a passion for children's healthcare. She loves hiking and photography in her free time.",
    initialAngle: 0, // Top position (12 o'clock)
  },
  {
    id: 'son',
    name: 'Alex',
    role: 'Son',
    icon: Users,
    color: 'rgb(59, 130, 246)', // blue-500
    bio: "Alex is 14 years old and loves playing soccer. He's also interested in computer programming and video games.",
    initialAngle: 90, // Right position (3 o'clock)
  },
  {
    id: 'daughter',
    name: 'Emma',
    role: 'Daughter',
    icon: Users,
    color: 'rgb(168, 85, 247)', // purple-500
    bio: "Emma is 10 years old and enjoys art, reading, and playing the piano. She wants to be a veterinarian when she grows up.",
    initialAngle: 180, // Bottom position (6 o'clock)
  },
  {
    id: 'spark',
    name: 'Spark',
    role: 'Pet Dog',
    icon: Dog,
    color: 'rgb(16, 185, 129)', // emerald-500
    bio: "Spark is a 3-year-old Golden Retriever who loves catching frisbees, swimming, and going on family hikes. He's extremely playful and protective of the family.",
    initialAngle: 270, // Left position (9 o'clock)
  },
];
