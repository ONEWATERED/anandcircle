
export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'facebook' | 'spotify' | 'anandcircle';
  url: string;
}

export interface Person {
  id: string;
  name: string;
  category: 'family' | 'politics' | 'business' | 'health' | 'learning' | 'unprofessional' | 'recommended';
  role: string;
  image?: string;
  special?: boolean;
  relationship?: string;
  socialLinks?: SocialLink[];
  linkedInUrl?: string;
  order?: number; // Added order property for explicit family ordering
}
