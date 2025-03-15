
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import PassionSection from '@/components/PassionSection';
import BlogPreview from '@/components/BlogPreview';
import HealthResources from '@/components/HealthResources';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Story />
      <PassionSection />
      <HealthResources />
      <BlogPreview />
    </MainLayout>
  );
};

export default Index;
