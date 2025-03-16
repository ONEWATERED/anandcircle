
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCarousel from './courses/CourseCarousel';
import CommunitySection from './courses/CommunitySection';
import CoursesHeader from './courses/CoursesHeader';

const CourseShowcase = () => {
  return (
    <section id="courses" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl -z-10"></div>
      
      <div className="section-container">
        <CoursesHeader />
        
        <Tabs defaultValue="courses" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="courses" className="text-base">Featured Courses</TabsTrigger>
            <TabsTrigger value="community" className="text-base">Circle Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-8">
            <CourseCarousel />
            
            <div className="text-center mt-10">
              <Button size="lg" className="bg-primary">
                Browse All Courses
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="space-y-8">
            <CommunitySection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CourseShowcase;
