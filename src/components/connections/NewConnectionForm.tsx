
import React, { useState } from 'react';
import { Person } from '@/types/connections';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the category type to match the Person type
type PersonCategory = 'family' | 'politics' | 'business' | 'health' | 'learning' | 'unprofessional' | 'recommended';

interface NewConnectionFormProps {
  onAddConnection: (connection: Partial<Person>) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, personId: string) => void;
}

const NewConnectionForm: React.FC<NewConnectionFormProps> = ({
  onAddConnection,
  onImageUpload
}) => {
  const [newConnection, setNewConnection] = useState<Partial<Person>>({
    name: '',
    role: '',
    category: 'business' as PersonCategory,
    relationship: '',
    special: false
  });

  const handleChange = (field: keyof Person, value: any) => {
    setNewConnection({
      ...newConnection,
      [field]: value
    });
  };

  const handleSubmit = () => {
    onAddConnection(newConnection);
    // Reset form after submission
    setNewConnection({
      name: '',
      role: '',
      category: 'business' as PersonCategory,
      relationship: '',
      special: false
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={newConnection.image || '/placeholder.svg'} alt="New connection" />
              <AvatarFallback>
                {newConnection.name ? newConnection.name.substring(0, 2) : 'NC'}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              onClick={() => {
                const input = document.getElementById('new-connection-image');
                input?.click();
              }}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Input
              id="new-connection-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const id = newConnection.name?.toLowerCase().replace(/\s+/g, '-') || 'temp-id';
                onImageUpload(e, id);
              }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">Name</Label>
            <Input
              id="new-name"
              value={newConnection.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-role">Role</Label>
            <Input
              id="new-role"
              value={newConnection.role}
              onChange={(e) => handleChange('role', e.target.value)}
              placeholder="Enter role"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-category">Category</Label>
          <Select 
            value={newConnection.category as PersonCategory}
            onValueChange={(value: PersonCategory) => handleChange('category', value)}
          >
            <SelectTrigger id="new-category">
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
          <Label htmlFor="new-relationship">Relationship</Label>
          <Input
            id="new-relationship"
            value={newConnection.relationship || ''}
            onChange={(e) => handleChange('relationship', e.target.value)}
            placeholder="Describe the relationship"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="new-special"
            checked={newConnection.special || false}
            onChange={(e) => handleChange('special', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="new-special">Special Connection</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="ml-auto flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Connection</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewConnectionForm;
