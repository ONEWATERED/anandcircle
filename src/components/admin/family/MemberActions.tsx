
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface MemberActionsProps {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const MemberActions: React.FC<MemberActionsProps> = ({ isEditing, onSave, onCancel }) => {
  if (isEditing) {
    return (
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onSave}
        >
          <Check className="h-4 w-4 text-green-500" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return null;
};

export default MemberActions;
