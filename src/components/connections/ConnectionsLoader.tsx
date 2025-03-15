
import React from 'react';
import { Loader2 } from 'lucide-react';

const ConnectionsLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default ConnectionsLoader;
