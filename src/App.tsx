
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import AdminAuth from '@/pages/AdminAuth';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminStoryMilestones from '@/pages/AdminStoryMilestones';
import AdminSettings from '@/pages/AdminSettings';
import AdminFamilyMembers from '@/pages/AdminFamilyMembers';
import AdminGallery from '@/pages/AdminGallery';
import ProfileDashboard from '@/pages/ProfileDashboard';
import PublicationsDashboard from '@/pages/PublicationsDashboard';
import DomainPage from '@/pages/DomainPage';
import Gallery from '@/pages/Gallery';
import AdminLayout from '@/layouts/AdminLayout';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/domains/:domainId" element={<DomainPage />} />
      
      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminAuth />} />
      
      {/* Admin Routes - Nested under AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="milestones" element={<AdminStoryMilestones />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="family" element={<AdminFamilyMembers />} />
        <Route path="gallery" element={<AdminGallery />} />
      </Route>
      
      {/* Dashboard Routes */}
      <Route path="/dashboard/profile" element={<ProfileDashboard />} />
      <Route path="/dashboard/publications" element={<PublicationsDashboard />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
