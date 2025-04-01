
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
import ProfileDashboard from '@/pages/ProfileDashboard';
import PublicationsDashboard from '@/pages/PublicationsDashboard';
import DomainPage from '@/pages/DomainPage';
import Gallery from '@/pages/Gallery';
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
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminAuth />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/milestones" element={<AdminStoryMilestones />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/family" element={<AdminFamilyMembers />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard/profile" element={<ProfileDashboard />} />
      <Route path="/dashboard/publications" element={<PublicationsDashboard />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
