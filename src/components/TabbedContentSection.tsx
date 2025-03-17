
import React from 'react';
import CourseShowcase from '@/components/CourseShowcase';

const TabbedContentSection = () => {
  return (
    <section id="courses" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseShowcase />
      </div>
    </section>
  );
};

export default TabbedContentSection;
