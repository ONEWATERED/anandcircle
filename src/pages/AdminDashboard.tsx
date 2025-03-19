
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { checkDatabaseConnection } from '@/utils/databaseUtils';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const { toast } = useToast();
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await checkDatabaseConnection();
        setDbStatus(isConnected ? 'connected' : 'error');
        
        if (!isConnected) {
          toast({
            title: "Database connection failed",
            description: "Unable to connect to the database",
            variant: "destructive"
          });
        }
      } catch (error) {
        setDbStatus('error');
        toast({
          title: "Database connection failed",
          description: "Error checking database connection",
          variant: "destructive"
        });
      }
    };
    
    checkConnection();
  }, [toast]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Manage your site's content and settings</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Database Status</span>
              {dbStatus === 'connected' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : dbStatus === 'error' ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-slate-500 animate-spin" />
              )}
            </CardTitle>
            <CardDescription>
              {dbStatus === 'connected' 
                ? 'Successfully connected to Supabase' 
                : dbStatus === 'error' 
                  ? 'Failed to connect to database' 
                  : 'Checking connection...'}
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-green-500" />
              Database
            </CardTitle>
            <CardDescription>Connected to Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dbStatus === 'connected' ? 'Active' : 'Checking...'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
