
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import PassionSection from '@/components/PassionSection';
import BlogPreview from '@/components/BlogPreview';
import HealthResources from '@/components/HealthResources';
import DigitalCloneConnect from '@/components/DigitalCloneConnect';
import InterestForm from '@/components/InterestForm';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Story />
      <PassionSection />
      <DigitalCloneConnect />
      <InterestForm />
      <HealthResources />
      <BlogPreview />
    </MainLayout>
  );
};

export default Index;
