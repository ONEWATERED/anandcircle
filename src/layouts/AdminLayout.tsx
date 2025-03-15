
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Image, 
  LogOut, 
  Database, 
  Home,
  Settings
} from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, isLoading, signOut } = useAdminAuth('/admin/login');
  const navigate = useNavigate();
  
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-slate-50 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`
              }
              end
            >
              <Home size={18} />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/admin/family-members" 
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <Users size={18} />
              <span>Family Members</span>
            </NavLink>
            
            <NavLink 
              to="/admin/images" 
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <Image size={18} />
              <span>Images</span>
            </NavLink>
            
            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => 
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </div>
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={signOut}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start mt-2"
            onClick={() => navigate("/")}
          >
            <Home size={18} className="mr-2" />
            View Public Site
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
