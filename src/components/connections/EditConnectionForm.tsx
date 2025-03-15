
import React from 'react';
import { Person } from '@/types/connections';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Save, X, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the category type to match the Person type
type PersonCategory = 'family' | 'politics' | 'business' | 'health' | 'learning' | 'unprofessional' | 'recommended';

interface EditConnectionFormProps {
  connection: Person;
  onUpdate: (updatedConnection: Person) => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditConnectionForm: React.FC<EditConnectionFormProps> = ({
  connection,
  onUpdate,
  onCancel,
  onImageUpload
}) => {
  const [editingConnection, setEditingConnection] = React.useState<Person>(connection);

  const handleChange = (field: keyof Person, value: any) => {
    setEditingConnection({
      ...editingConnection,
      [field]: value
    });
  };

  const handleSave = () => {
    onUpdate(editingConnection);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Edit Connection</h3>
        <div className="space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={editingConnection.image || '/placeholder.svg'} alt={editingConnection.name} />
              <AvatarFallback>
                {editingConnection.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              onClick={() => {
                const input = document.getElementById(`edit-image-${connection.id}`);
                input?.click();
              }}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Input
              id={`edit-image-${connection.id}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`edit-name-${connection.id}`}>Name</Label>
          <Input
            id={`edit-name-${connection.id}`}
            value={editingConnection.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`edit-role-${connection.id}`}>Role</Label>
          <Input
            id={`edit-role-${connection.id}`}
            value={editingConnection.role}
            onChange={(e) => handleChange('role', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`edit-category-${connection.id}`}>Category</Label>
          <Select 
            value={editingConnection.category}
            onValueChange={(value: PersonCategory) => handleChange('category', value)}
          >
            <SelectTrigger id={`edit-category-${connection.id}`}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="unprofessional">Edgy</SelectItem>
              <SelectItem value="recommended">Recommended</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`edit-relationship-${connection.id}`}>Relationship</Label>
          <Input
            id={`edit-relationship-${connection.id}`}
            value={editingConnection.relationship || ''}
            onChange={(e) => handleChange('relationship', e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`edit-special-${connection.id}`}
            checked={editingConnection.special || false}
            onChange={(e) => handleChange('special', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor={`edit-special-${connection.id}`}>Special Connection</Label>
        </div>
      </div>
    </div>
  );
};

export default EditConnectionForm;
