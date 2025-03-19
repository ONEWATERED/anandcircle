
import React from 'react';
import { Users } from 'lucide-react';
import SocialLinksForm, { SocialLinksFormValues } from './social/SocialLinksForm';

interface SocialLinksSectionProps {
  initialValues: SocialLinksFormValues;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ initialValues }) => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
        <Users className="mr-2" size={20} />
        Social Links
      </h2>
      
      <SocialLinksForm initialValues={initialValues} />
    </div>
  );
};

export default SocialLinksSection;
