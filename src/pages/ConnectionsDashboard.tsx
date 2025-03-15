
import React from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const ConnectionsDashboard = () => {
  const { isAuthenticated, isLoading } = useAdminAuth('/admin/login');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Redirect is handled by the hook
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Connections Dashboard</h1>
      <p className="text-muted-foreground mb-4">
        Manage your connections and relationships from this dashboard.
      </p>
      
      {/* Connections management interface will be implemented here */}
      <div className="p-12 border rounded-lg text-center text-muted-foreground">
        Connections management interface coming soon...
      </div>
    </div>
  );
};

export default ConnectionsDashboard;
