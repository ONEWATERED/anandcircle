
import React from 'react';
import { Database, BrainCircuit, Lightbulb, FileSpreadsheet } from 'lucide-react';
import CourseCard from './CourseCard';
import { courses } from '@/data/courseData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const CourseCarousel = () => {
  // Map course IDs to their respective icons
  const getCourseIcon = (courseId: string) => {
    switch (courseId) {
      case 'prompt-engineering':
        return <Lightbulb className="h-5 w-5 text-gray-800" />;
      case 'applied-ai':
        return <BrainCircuit className="h-5 w-5 text-gray-800" />;
      case 'data-certification':
        return <FileSpreadsheet className="h-5 w-5 text-gray-800" />;
      default:
        return <Database className="h-5 w-5 text-gray-800" />;
    }
  };

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {courses.map((course) => (
          <CarouselItem key={course.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <CourseCard 
                course={course} 
                icon={getCourseIcon(course.id)} 
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-4 mt-8">
        <CarouselPrevious className="relative static" />
        <CarouselNext className="relative static" />
      </div>
    </Carousel>
  );
};

export default CourseCarousel;
