
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

// Position family members evenly spaced around a perfect circle (90 degrees apart)
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
  },
  {
    id: 'candace',
    name: 'Candace Owens',
    role: 'Political Commentator',
    icon: Users,
    color: "rgb(236, 72, 153)", // pink-500
    bio: "Candace Owens is a conservative commentator, author, and political activist known for her critical perspectives on contemporary political and social issues.",
    initialAngle: 45, // Between 12 and 3 o'clock
    socialLinks: {
      twitter: "https://twitter.com/RealCandaceO",
      instagram: "https://instagram.com/realcandaceowens",
      facebook: "https://facebook.com/RealCandaceOwens"
    }
  },
  {
    id: 'naval',
    name: 'Naval Ravikant',
    role: 'Entrepreneur & Investor',
    icon: Users,
    color: "rgb(14, 165, 233)", // sky-500
    bio: "Naval Ravikant is an entrepreneur, investor, and modern philosopher known for founding AngelList and sharing wisdom on wealth creation, happiness, and decision-making.",
    initialAngle: 135, // Between 3 and 6 o'clock
    socialLinks: {
      twitter: "https://twitter.com/naval",
      linkedin: "https://linkedin.com/in/navalr"
    }
  },
  {
    id: 'patrick',
    name: 'Patrick McDavid',
    role: 'Entrepreneur',
    icon: Users,
    color: "rgb(34, 197, 94)", // green-500
    bio: "Patrick McDavid is an accomplished entrepreneur and business strategist with expertise in digital transformation and innovative business models.",
    initialAngle: 225, // Between 6 and 9 o'clock
    socialLinks: {
      linkedin: "https://linkedin.com/in/patrickm",
      twitter: "https://twitter.com/patrickmcdavid"
    }
  },
  {
    id: 'joe',
    name: 'Joe Dispenza',
    role: 'Author & Researcher',
    icon: Users,
    color: "rgb(249, 115, 22)", // orange-500
    bio: "Dr. Joe Dispenza is a researcher, lecturer, and author who explores neuroscience, epigenetics, and quantum physics to understand the science behind spontaneous remissions.",
    initialAngle: 315, // Between 9 and 12 o'clock
    socialLinks: {
      facebook: "https://facebook.com/DrJoeDispenzaOfficial",
      instagram: "https://instagram.com/drjoedispenza"
    }
  },
  {
    id: 'huberman',
    name: 'Dr. Andrew Huberman',
    role: 'Neuroscientist',
    icon: Users,
    color: "rgb(139, 92, 246)", // violet-500
    bio: "Dr. Andrew Huberman is a neuroscientist and professor at Stanford School of Medicine who focuses on neural development, brain plasticity, and neural regeneration.",
    initialAngle: 15, // Just past 12 o'clock
    socialLinks: {
      twitter: "https://twitter.com/hubermanlab",
      instagram: "https://instagram.com/hubermanlab",
      linkedin: "https://linkedin.com/in/andrew-huberman"
    }
  }
];
