import React, { useState } from 'react';
import { useAdminConnections } from '@/hooks/useAdminConnections';
import { Connection } from '@/types/thought-leaders';
import ConnectionsList from '@/components/admin/ConnectionsList';
import ConnectionForm from '@/components/admin/ConnectionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminConnections: React.FC = () => {
  const {
    connections,
    isLoading,
    selectedConnection,
    setSelectedConnection,
    addConnection,
    updateConnection,
    deleteConnection,
    uploadConnectionImage
  } = useAdminConnections();

  const [isAdding, setIsAdding] = useState(false);

  const handleSelect = (connection: Connection) => {
    setSelectedConnection(connection);
  };

  const handleAddNew = () => {
    setSelectedConnection(null);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setSelectedConnection(null);
    setIsAdding(false);
  };

  const handleSave = async (connection: Partial<Connection>) => {
    if (isAdding) {
      const success = await addConnection(connection);
      if (success) setIsAdding(false);
      return success;
    } else if (selectedConnection) {
      const updatedConnection = {
        ...selectedConnection,
        ...connection
      } as Connection;
      const success = await updateConnection(updatedConnection);
      return success;
    }
    return false;
  };

  // If we're editing or adding, show the form
  if (selectedConnection || isAdding) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Connections
        </Button>
        
        <ConnectionForm
          connection={selectedConnection}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={selectedConnection ? deleteConnection : undefined}
          onUploadImage={uploadConnectionImage}
          isNew={isAdding}
        />
      </div>
    );
  }

  // Otherwise show the list
  return (
    <ConnectionsList
      connections={connections}
      onSelect={handleSelect}
      onAddNew={handleAddNew}
      isLoading={isLoading}
    />
  );
};

export default AdminConnections;
