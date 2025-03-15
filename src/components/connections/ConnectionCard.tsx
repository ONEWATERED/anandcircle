
import React from 'react';
import { Person } from '@/types/connections';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ImageIcon } from 'lucide-react';

interface ConnectionCardProps {
  connection: Person;
  onEdit: (connection: Person) => void;
  onDelete: (id: string) => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  connection,
  onEdit,
  onDelete
}) => {
  return (
    <Card key={connection.id} className="overflow-hidden">
      <div 
        className="h-48 bg-slate-100 flex items-center justify-center relative"
        style={{ 
          backgroundImage: connection.image ? `url(${connection.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!connection.image && (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={48} />
            <span className="mt-2">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
          {connection.role}
        </div>
        {connection.special && (
          <div className="absolute bottom-2 left-2 bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs flex items-center">
            <span>Special</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{connection.name}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">{connection.category}</span>
        </div>
        {connection.relationship && (
          <p className="text-sm text-muted-foreground italic">
            "{connection.relationship.substring(0, 100)}{connection.relationship.length > 100 ? '...' : ''}"
          </p>
        )}
        <div className="flex mt-2">
          {connection.socialLinks && connection.socialLinks.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {connection.socialLinks.length} social links
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onEdit(connection)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(connection.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
