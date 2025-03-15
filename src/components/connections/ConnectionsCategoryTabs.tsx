
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Person } from '@/types/connections';
import { Users, Heart, Activity, Flag, Briefcase } from 'lucide-react';
import ConnectionsTabsContent from './ConnectionsTabsContent';

interface ConnectionsCategoryTabsProps {
  connections: Person[];
  activeCategoryTab: string;
  setActiveCategoryTab: (category: string) => void;
  filteredConnections: Person[];
  editingConnection: Person | null;
  onEditConnection: (connection: Person) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteConnection: (id: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, personId: string) => void;
  addConnection: (newConnection: Partial<Person>) => void;
}

const ConnectionsCategoryTabs: React.FC<ConnectionsCategoryTabsProps> = ({
  connections,
  activeCategoryTab,
  setActiveCategoryTab,
  filteredConnections,
  editingConnection,
  onEditConnection,
  onSaveEdit,
  onCancelEdit,
  onDeleteConnection,
  onImageUpload,
  addConnection
}) => {
  // Group by category for display
  const familyConnections = connections.filter(conn => conn.category === 'family');
  const businessConnections = connections.filter(conn => conn.category === 'business');
  const healthConnections = connections.filter(conn => conn.category === 'health');
  const politicsConnections = connections.filter(conn => conn.category === 'politics');
  
  return (
    <Tabs defaultValue="all" onValueChange={setActiveCategoryTab}>
      <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto">
        <TabsTrigger value="all" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>All ({connections.length})</span>
        </TabsTrigger>
        <TabsTrigger value="family" className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span>Family ({familyConnections.length})</span>
        </TabsTrigger>
        <TabsTrigger value="business" className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          <span>Business ({businessConnections.length})</span>
        </TabsTrigger>
        <TabsTrigger value="health" className="flex items-center gap-1">
          <Activity className="h-4 w-4" />
          <span>Health ({healthConnections.length})</span>
        </TabsTrigger>
        <TabsTrigger value="politics" className="flex items-center gap-1">
          <Flag className="h-4 w-4" />
          <span>Politics ({politicsConnections.length})</span>
        </TabsTrigger>
      </TabsList>
      
      <ConnectionsTabsContent 
        filteredConnections={filteredConnections}
        editingConnection={editingConnection}
        onEditConnection={onEditConnection}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onDeleteConnection={onDeleteConnection}
        onImageUpload={onImageUpload}
        addConnection={addConnection}
        activeCategoryTab={activeCategoryTab}
      />
    </Tabs>
  );
};

export default ConnectionsCategoryTabs;
