
export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'twitter';
  url: string;
}

export interface Person {
  id: string;
  name: string;
  category: 'family' | 'politics' | 'business' | 'health' | 'learning';
  role: string;
  image?: string;
  special?: boolean;
  relationship?: string;
  socialLinks?: SocialLink[];
  linkedInUrl?: string;
}
