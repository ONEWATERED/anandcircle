
import React from 'react';
import CourseCarousel from './courses/CourseCarousel';
import CoursesHeader from './courses/CoursesHeader';

const CourseShowcase = () => {
  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl -z-10"></div>
      
      <div className="section-container">
        <CoursesHeader />
        <CourseCarousel />
      </div>
    </section>
  );
};

export default CourseShowcase;
