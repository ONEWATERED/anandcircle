
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import ProfileDashboard from '@/pages/ProfileDashboard';
import PublicationsDashboard from '@/pages/PublicationsDashboard';
import DomainPage from '@/pages/DomainPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/domains/:domainId" element={<DomainPage />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard/profile" element={<ProfileDashboard />} />
      <Route path="/dashboard/publications" element={<PublicationsDashboard />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
