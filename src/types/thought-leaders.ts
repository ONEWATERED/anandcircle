
export interface SocialLink {
  id?: string;
  platform: 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'facebook' | 'spotify' | 'anandcircle';
  url: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  order_position?: number;
  socialLinks?: SocialLink[];
  created_at?: string;
  updated_at?: string;
}

export interface Connection {
  id: string;
  name: string;
  role: string;
  category: string;
  bio?: string;
  image_url?: string;
  special?: boolean;
  order_position?: number;
  socialLinks?: SocialLink[];
  created_at?: string;
  updated_at?: string;
}

export interface PersonalProfile {
  id: string;
  name: string;
  bio?: string;
  photo_url?: string;
  resume_url?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    anandcircle?: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Add ThoughtLeader interface that was missing
export interface ThoughtLeader {
  id: string;
  name: string;
  role: string;
  category: string;
  image_url?: string;
  special?: boolean;
  relationship?: string;
  linkedin_url?: string;
  order_position?: number;
  socialLinks?: SocialLink[];
  created_at?: string;
  updated_at?: string;
}
