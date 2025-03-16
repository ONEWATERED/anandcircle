
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseShowcase from '@/components/CourseShowcase'; // Horses
import AIGalleryShowcase from '@/components/AIGalleryShowcase'; // Digital collections
import BlogPreview from '@/components/BlogPreview'; // Art articles
import { Horse, Images, BookText } from 'lucide-react';

const TabbedContentSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Collections & Articles
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore my various interests, collections, and publications.
          </p>
        </div>
        
        <Tabs defaultValue="horses" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger 
              value="horses" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2 py-3 text-lg transition-all duration-300"
            >
              <Horse className="h-5 w-5" />
              <span>Horses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="digital" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white flex items-center gap-2 py-3 text-lg transition-all duration-300"
            >
              <Images className="h-5 w-5" />
              <span>Digital Art</span>
            </TabsTrigger>
            <TabsTrigger 
              value="articles" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-emerald-500 data-[state=active]:text-white flex items-center gap-2 py-3 text-lg transition-all duration-300"
            >
              <BookText className="h-5 w-5" />
              <span>Articles</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="horses" className="mt-0">
              <CourseShowcase />
            </TabsContent>
            
            <TabsContent value="digital" className="mt-0">
              <AIGalleryShowcase />
            </TabsContent>
            
            <TabsContent value="articles" className="mt-0">
              <BlogPreview />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedContentSection;
