
export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'twitter';
  url: string;
}

export interface ThoughtLeader {
  id: string;
  name: string;
  role: string;
  category: string;
  image_url?: string;
  special?: boolean;
  relationship?: string;
  socialLinks?: SocialLink[];
  linkedin_url?: string;
  order_position?: number;
  created_at?: string;
  updated_at?: string;
}
