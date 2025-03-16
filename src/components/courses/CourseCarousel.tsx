
import React from 'react';
import { Database, Lightbulb, BookOpen, LineChart, Brain } from 'lucide-react';
import CourseCard from './CourseCard';
import { courses } from '@/data/courseData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const CourseCarousel = () => {
  // Map course IDs to their respective icons
  const getCourseIcon = (courseId: string) => {
    switch (courseId) {
      case 'data-fundamentals':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'ai-foundations':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'prompt-engineering':
        return <Lightbulb className="h-5 w-5 text-emerald-500" />;
      case 'data-visualization':
        return <LineChart className="h-5 w-5 text-amber-500" />;
      case 'llm-development':
        return <BookOpen className="h-5 w-5 text-indigo-500" />;
      default:
        return <Database className="h-5 w-5 text-blue-500" />;
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
