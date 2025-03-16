
import React, { useState, useEffect } from 'react';
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

        {/* Combined Resources Section */}
        <div className="space-y-12">
          <PublicationsCarousel publications={publications} />
          <PremiumVideosSection />
        </div>
      </div>
    </section>
  );
};

export default HealthResources;
