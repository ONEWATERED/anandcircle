
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { checkDatabaseConnection } from '@/utils/databaseUtils';
import { Users, Image, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [counts, setCounts] = useState({
    familyMembers: 0,
    images: 0,
    profiles: 0
  });
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
  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Get count of connection_images
        const { count: imagesCount, error: imagesError } = await supabase
          .from('connection_images')
          .select('*', { count: 'exact', head: true });
          
        // Get count of profiles  
        const { count: profilesCount, error: profilesError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (imagesError) throw imagesError;
        if (profilesError) throw profilesError;
        
        setCounts({
          familyMembers: 9, // Hardcoded based on familyData.ts
          images: imagesCount || 0,
          profiles: profilesCount || 0
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
        toast({
          title: "Error fetching data",
          description: "Could not retrieve data counts",
          variant: "destructive"
        });
      }
    };
    
    if (dbStatus === 'connected') {
      fetchCounts();
    }
  }, [dbStatus, toast]);
  
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
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              Family Members
            </CardTitle>
            <CardDescription>Manage family circle members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{counts.familyMembers}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Image className="mr-2 h-5 w-5 text-purple-500" />
              Images
            </CardTitle>
            <CardDescription>Stored connection images</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{counts.images}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-green-500" />
              Profiles
            </CardTitle>
            <CardDescription>User profiles in database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{counts.profiles}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Manage Family Members
              </CardTitle>
              <CardDescription>Edit family circle data</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="mr-2 h-5 w-5" />
                Upload Images
              </CardTitle>
              <CardDescription>Add or replace member images</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
