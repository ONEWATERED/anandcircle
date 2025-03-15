
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function AdminSettings() {
  const { toast } = useToast();
  
  const handleResetPassword = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (!data.session?.user.email) {
        throw new Error("No email found for current user");
      }
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.session.user.email
      );
      
      if (resetError) throw resetError;
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for a password reset link"
      });
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast({
        title: "Error",
        description: error.message || "Could not send password reset email",
        variant: "destructive"
      });
    }
  };
  
  const handleClearCache = () => {
    try {
      // Clear localStorage items related to the app
      const keysToKeep = ['supabase.auth.token']; // Keep auth token
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      }
      
      toast({
        title: "Cache cleared",
        description: "Local cache has been cleared successfully"
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
      toast({
        title: "Error",
        description: "Could not clear local cache",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
        <p className="text-gray-500">Manage your account and application settings</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your admin account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
              <p className="text-sm text-gray-500">
                Sends a password reset link to your registered email address
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>Manage global application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={handleClearCache}
              >
                Clear Local Cache
              </Button>
              <p className="text-sm text-gray-500">
                Clears cached data stored in your browser
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
