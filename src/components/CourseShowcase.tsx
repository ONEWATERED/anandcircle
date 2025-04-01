
import React from 'react';
import CourseCarousel from './courses/CourseCarousel';
import CoursesHeader from './courses/CoursesHeader';

const CourseShowcase = () => {
  return (
    <section className="py-6 md:py-10 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-tech-dark/50 -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl -z-10"></div>
      
      <div className="section-container">
        <CoursesHeader />
        <CourseCarousel />
      </div>
    </section>
  );
};

export default CourseShowcase;
