
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Code, Lightbulb, MessageSquare } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import CourseCard from './CourseCard';
import { courses } from '@/data/courseData';

const courseIcons = {
  'data-fundamentals': <Code className="h-10 w-10 text-blue-500" />,
  'ai-foundations': <Lightbulb className="h-10 w-10 text-purple-500" />,
  'prompt-engineering': <MessageSquare className="h-10 w-10 text-emerald-500" />,
  'data-visualization': <Code className="h-10 w-10 text-amber-500" />,
  'llm-development': <Lightbulb className="h-10 w-10 text-indigo-500" />
};

const CourseCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {courses.map((course) => (
            <div key={course.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
              <CourseCard 
                course={course} 
                icon={courseIcons[course.id as keyof typeof courseIcons]} 
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full h-8 w-8"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full h-8 w-8"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCarousel;
