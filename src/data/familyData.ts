
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
    youtube?: string;
  };
}

// Empty array since we're removing all family members
export const familyMembers: FamilyMember[] = [];
