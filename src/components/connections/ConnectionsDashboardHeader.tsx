
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface ConnectionsDashboardHeaderProps {
  onSyncConnections: () => void;
  isSyncing: boolean;
}

const ConnectionsDashboardHeader: React.FC<ConnectionsDashboardHeaderProps> = ({
  onSyncConnections,
  isSyncing
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Manage Connections</h1>
        <p className="text-muted-foreground">
          Add, edit, or remove people in your network
        </p>
      </div>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onSyncConnections}
        disabled={isSyncing}
      >
        {isSyncing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        <span>Sync Connections</span>
      </Button>
    </div>
  );
};

export default ConnectionsDashboardHeader;
