
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseShowcase from '@/components/CourseShowcase';
import { GraduationCap, Users } from 'lucide-react';

const TabbedContentSection = () => {
  return (
    <section id="courses" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-6">
            <TabsTrigger 
              value="courses" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2 py-3 text-lg transition-all duration-300"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white flex items-center gap-2 py-3 text-lg transition-all duration-300"
            >
              <Users className="h-5 w-5" />
              <span>Circle</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="courses" className="mt-0">
              <CourseShowcase />
            </TabsContent>
            
            <TabsContent value="community" className="mt-0">
              <div className="max-w-3xl mx-auto text-center">
                <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Join the <span className="text-gradient-primary">One Water Circle</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with like-minded professionals, participate in exclusive events, 
                    and engage in meaningful discussions around data science, AI, and prompt engineering.
                  </p>
                  <a 
                    href="https://www.circleso.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Join the One Water Circle
                  </a>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedContentSection;
