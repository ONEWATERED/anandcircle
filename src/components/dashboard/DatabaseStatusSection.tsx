
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { checkDatabaseConnection } from '@/utils/databaseConnection';
import { supabase } from '@/integrations/supabase/client';

interface DatabaseStatusSectionProps {
  initialStatus: boolean;
}

const DatabaseStatusSection: React.FC<DatabaseStatusSectionProps> = ({ initialStatus }) => {
  const [isDatabaseConnected, setIsDatabaseConnected] = useState<boolean>(initialStatus);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(false);
  
  useEffect(() => {
    // Validate the initial connection status
    const validateConnection = async () => {
      if (initialStatus) {
        try {
          const isConnected = await checkDatabaseConnection();
          if (isConnected !== initialStatus) {
            setIsDatabaseConnected(isConnected);
          }
        } catch (error) {
          console.error("Error validating database connection:", error);
        }
      }
    };
    
    validateConnection();
  }, [initialStatus]);

  const testDatabaseConnection = async () => {
    try {
      setIsCheckingConnection(true);
      
      // Test connection to Supabase
      const isConnected = await checkDatabaseConnection();
      
      // Update connection status
      setIsDatabaseConnected(isConnected);
      
      if (isConnected) {
        toast.success("Successfully connected to database!");
        
        // Try to authenticate if not already authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.info("You're not logged in. Some features may be limited.", {
            duration: 5000,
            action: {
              label: "Login",
              onClick: () => window.location.href = "/admin/login"
            }
          });
        }
      } else {
        toast.error("Failed to connect to database.");
      }
    } catch (error) {
      console.error("Error testing database connection:", error);
      toast.error("Error testing connection");
      setIsDatabaseConnected(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
          Database Integration
        </CardTitle>
        <CardDescription>
          Manage your database connection for storing profile data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-3 ${isDatabaseConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium">Database Status:</span>
          </div>
          <span className={isDatabaseConnected ? 'text-green-600' : 'text-red-600'}>
            {isCheckingConnection ? 'Checking...' : (isDatabaseConnected ? 'Connected' : 'Not Connected')}
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {isDatabaseConnected ? (
            <p>Your profile data is being saved to the Supabase database.</p>
          ) : (
            <p>Not connected to Supabase. Data is currently stored in localStorage as a temporary solution.</p>
          )}
        </div>
        
        <Button 
          className="w-full" 
          variant="outline" 
          onClick={testDatabaseConnection}
          disabled={isCheckingConnection}
        >
          {isCheckingConnection ? 'Testing Connection...' : (isDatabaseConnected ? 'Test Connection' : 'Connect Database')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DatabaseStatusSection;
