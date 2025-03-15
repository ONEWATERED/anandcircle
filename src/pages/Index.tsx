
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import PassionSection from '@/components/PassionSection';
import BlogPreview from '@/components/BlogPreview';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Story />
      <PassionSection />
      <BlogPreview />
    </MainLayout>
  );
};

export default Index;
