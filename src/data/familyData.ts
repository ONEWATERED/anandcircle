
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
    youtube?: string; // Added youtube as an allowed property
  };
}

// Keep only the four family members, positioned evenly around the circle
export const familyMembers: FamilyMember[] = [
  {
    id: 'preeti',
    name: 'Preeti Anand',
    role: 'Wife',
    icon: Heart,
    color: "rgb(244, 114, 182)", // rose-500
    bio: "My life partner and greatest supporter",
    initialAngle: 0, // Top position (12 o'clock)
    socialLinks: {
      twitter: "https://twitter.com/preeti",
      instagram: "https://instagram.com/preeti",
      linkedin: "https://linkedin.com/in/preeti"
    }
  },
  {
    id: 'rohit',
    name: 'Rohit Anand',
    role: 'Son',
    icon: Users,
    color: "rgb(59, 130, 246)", // blue-500
    bio: "Loves me and makes me proud every day. Working on some magic in the web3 space, even though I had my reservations about him dropping out of med school. Now I believe in his vision and I'm glad I let him pursue his passion rather than mine. He was the inspiration behind me to actually learn and connect Blockchain to the work I do.",
    initialAngle: 90, // Right position (3 o'clock)
    socialLinks: {
      instagram: "https://instagram.com/rohit",
      twitter: "https://twitter.com/rohit",
      linkedin: "https://linkedin.com/in/rohit"
    }
  },
  {
    id: 'simi',
    name: 'Simi Anand',
    role: 'Daughter',
    icon: Users,
    color: "rgb(168, 85, 247)", // purple-500
    bio: "Teaching me new ways to see the world",
    initialAngle: 180, // Bottom position (6 o'clock)
    socialLinks: {
      instagram: "https://instagram.com/simianand",
      twitter: "https://twitter.com/simianand",
      youtube: "https://youtube.com/simianand"
    }
  },
  {
    id: 'spark',
    name: 'Spark',
    role: 'Pet Dog',
    icon: Dog,
    color: "rgb(16, 185, 129)", // emerald-500
    bio: "Our loyal companion",
    initialAngle: 270, // Left position (9 o'clock)
    socialLinks: {
      instagram: "https://instagram.com/spark_dog"
    }
  }
];
