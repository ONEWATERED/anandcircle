
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PublicationsDashboard from "./pages/PublicationsDashboard";
import ConnectionsDashboard from "./pages/ConnectionsDashboard";
import AdminAuth from "./pages/AdminAuth";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFamilyMembers from "./pages/AdminFamilyMembers";
import AdminImages from "./pages/AdminImages";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="family-members" element={<AdminFamilyMembers />} />
            <Route path="images" element={<AdminImages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="/admin/publications" element={<PublicationsDashboard />} />
          <Route path="/connections" element={<ConnectionsDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
