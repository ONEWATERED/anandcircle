
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FamilyMembersHeaderProps {
  onAddMember: () => void;
}

const FamilyMembersHeader: React.FC<FamilyMembersHeaderProps> = ({ onAddMember }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Family Members</h1>
        <p className="text-gray-500">Manage your immediate family members</p>
      </div>
      <Button onClick={onAddMember}>
        <Plus className="mr-2 h-4 w-4" />
        Add Member
      </Button>
    </div>
  );
};

export default FamilyMembersHeader;
