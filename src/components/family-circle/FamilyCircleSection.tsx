
import React, { useState, useEffect } from 'react';
import FamilyCircleGraphic from './FamilyCircleGraphic';
import { FamilyMember, familyMembers } from '@/data/familyData';
import { getConnectionImage } from '@/utils/connectionImages';
import FamilyCircleHeader from './FamilyCircleHeader';
import SelectedMemberActions from './SelectedMemberActions';

const FamilyCircleSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [memberImages, setMemberImages] = useState<Record<string, string | null>>({});

  // Load member images from database on component mount
  useEffect(() => {
    const loadMemberImages = async () => {
      const images: Record<string, string | null> = {};
      
      for (const member of familyMembers) {
        try {
          const imageUrl = await getConnectionImage(member.id);
          if (imageUrl) {
            images[member.id] = imageUrl;
            console.log(`Loaded image for ${member.name}:`, imageUrl);
          }
        } catch (error) {
          console.error(`Error loading image for ${member.name}:`, error);
        }
      }
      
      setMemberImages(images);
    };
    
    loadMemberImages();
  }, []);

  // Handler to display member details when selected
  const handleSelectMember = (member: FamilyMember | null) => {
    console.log("Selected member:", member?.name);
    setSelectedMember(member);
  };

  return (
    <section className="py-16 relative bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <FamilyCircleHeader />

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="w-full">
            <FamilyCircleGraphic 
              onSelectMember={handleSelectMember} 
              memberImages={memberImages}
            />
          </div>
        </div>

        {selectedMember && (
          <SelectedMemberActions 
            selectedMember={selectedMember}
            memberImages={memberImages}
            setMemberImages={setMemberImages}
          />
        )}
      </div>
    </section>
  );
};

export default FamilyCircleSection;
