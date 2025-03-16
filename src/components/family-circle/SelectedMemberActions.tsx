
import React from 'react';
import { FamilyMember } from '@/data/familyData';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import MemberPhotoUpdateDialog from './MemberPhotoUpdateDialog';

interface SelectedMemberActionsProps {
  selectedMember: FamilyMember;
  memberImages: Record<string, string | null>;
  setMemberImages: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
}

const SelectedMemberActions: React.FC<SelectedMemberActionsProps> = ({
  selectedMember,
  memberImages,
  setMemberImages
}) => {
  if (!selectedMember) return null;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="mt-6 mx-auto flex items-center gap-2" 
          variant="outline"
        >
          <ImageIcon size={16} />
          Update {selectedMember.name}'s Photo
        </Button>
      </DialogTrigger>
      <MemberPhotoUpdateDialog 
        selectedMember={selectedMember}
        memberImages={memberImages}
        setMemberImages={setMemberImages}
      />
    </Dialog>
  );
};

export default SelectedMemberActions;
