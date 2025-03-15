
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Publication } from '@/types/publications';
import { healthResources } from './health-resources/resources-data';
import HealthResourcesHeader from './health-resources/HealthResourcesHeader';
import PublicationsCarousel from './health-resources/PublicationsCarousel';
import PremiumVideosSection from './health-resources/PremiumVideosSection';

const HealthResources = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  
  // In a real application, you would fetch publications from an API
  useEffect(() => {
    // Simulating API call
    setPublications(healthResources);
  }, []);

  return (
    <section id="health-resources" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <HealthResourcesHeader />

        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-12">
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="videos">Premium Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="publications" className="space-y-8">
            <PublicationsCarousel publications={publications} />
          </TabsContent>
          
          <TabsContent value="videos">
            <PremiumVideosSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HealthResources;
