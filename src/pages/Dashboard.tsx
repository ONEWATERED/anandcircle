
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useDashboardData } from '@/hooks/useDashboardData';
import ProfileImageSection from '@/components/dashboard/ProfileImageSection';
import SocialLinksSection from '@/components/dashboard/SocialLinksSection';
import ResumeSection from '@/components/dashboard/ResumeSection';
import DatabaseStatusSection from '@/components/dashboard/DatabaseStatusSection';

const Dashboard = () => {
  const { profileImageUrl, resumeUrl, socialLinks, isDatabaseConnected, isLoading } = useDashboardData();

  console.log("Dashboard rendering with profile image:", profileImageUrl);

  return (
    <MainLayout>
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Dashboard</h1>
              <p className="text-muted-foreground">Manage your profile content</p>
              {!isDatabaseConnected && !isLoading && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> You are currently using local storage for saving data. 
                    Database connection is not active. Try logging in or check your Supabase configuration.
                  </p>
                </div>
              )}
              {isLoading && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Loading your profile data...
                </div>
              )}
            </div>
            
            {!isLoading && (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  <ProfileImageSection initialPreviewUrl={profileImageUrl} />
                  <SocialLinksSection initialValues={socialLinks} />
                </div>
                
                <div className="my-8">
                  <ResumeSection initialResumeUrl={resumeUrl} />
                </div>
                
                <div className="mb-8">
                  <DatabaseStatusSection initialStatus={isDatabaseConnected} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
