
import React from 'react';
import { Person } from '@/types/connections';
import ConnectionCard from './ConnectionCard';
import EditConnectionForm from './EditConnectionForm';
import { Card } from '@/components/ui/card';

interface ConnectionListProps {
  connections: Person[];
  editingConnection: Person | null;
  onEdit: (connection: Person) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const ConnectionList: React.FC<ConnectionListProps> = ({
  connections,
  editingConnection,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onImageUpload
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {connections.map(connection => (
        <Card key={connection.id} className="overflow-hidden">
          {editingConnection && editingConnection.id === connection.id ? (
            // Editing mode
            <EditConnectionForm
              connection={editingConnection}
              onUpdate={onSaveEdit}
              onCancel={onCancelEdit}
              onImageUpload={(e) => onImageUpload(e, editingConnection.id)}
            />
          ) : (
            // View mode
            <ConnectionCard
              connection={connection}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default ConnectionList;
