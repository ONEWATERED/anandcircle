
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import { FollowingSection } from '@/components/FollowingSection';
import PassionSection from '@/components/PassionSection';
import BlogPreview from '@/components/BlogPreview';
import HealthResources from '@/components/HealthResources';
import InterestForm from '@/components/InterestForm';
import CourseShowcase from '@/components/CourseShowcase';
import AIGalleryShowcase from '@/components/AIGalleryShowcase';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Story />
      <FollowingSection />
      <PassionSection />
      <CourseShowcase />
      <AIGalleryShowcase />
      <HealthResources />
      <BlogPreview />
      <InterestForm />
    </MainLayout>
  );
};

export default Index;
