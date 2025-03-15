
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Person } from '@/types/connections';
import ConnectionList from './ConnectionList';
import NewConnectionForm from './NewConnectionForm';

interface ConnectionsTabsContentProps {
  filteredConnections: Person[];
  editingConnection: Person | null;
  onEditConnection: (connection: Person) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteConnection: (id: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, personId: string) => void;
  addConnection: (newConnection: Partial<Person>) => void;
  activeCategoryTab: string;
}

const ConnectionsTabsContent: React.FC<ConnectionsTabsContentProps> = ({
  filteredConnections,
  editingConnection,
  onEditConnection,
  onSaveEdit,
  onCancelEdit,
  onDeleteConnection,
  onImageUpload,
  addConnection,
  activeCategoryTab
}) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="col-span-1">
        <NewConnectionForm 
          onAddConnection={addConnection}
          onImageUpload={onImageUpload}
        />
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {activeCategoryTab === 'all' 
                ? 'All Connections' 
                : `${activeCategoryTab.charAt(0).toUpperCase() + activeCategoryTab.slice(1)} Connections`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectionList
              connections={filteredConnections}
              editingConnection={editingConnection}
              onEdit={onEditConnection}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onDelete={onDeleteConnection}
              onImageUpload={onImageUpload}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionsTabsContent;
