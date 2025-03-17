
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import { Toaster } from '@/components/ui/toaster';
import NotFound from '@/pages/NotFound';
import AdminAuth from '@/pages/AdminAuth';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminSettings from '@/pages/AdminSettings';
import AdminLayout from '@/layouts/AdminLayout';
import AdminConnections from '@/pages/AdminConnections';
import AdminStoryMilestones from '@/pages/AdminStoryMilestones';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="connections" element={<AdminConnections />} />
          <Route path="story" element={<AdminStoryMilestones />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
