
import React from 'react';
import { FollowingHeader } from './following/FollowingHeader';
import { PersonList } from './following/PersonList';
import { useLocalConnections } from './following/UseLocalConnections';
import { defaultPeople } from './following/connectionUtils';

export const FollowingSection: React.FC = () => {
  const { people } = useLocalConnections();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FollowingHeader 
          title="Network"
          subtitle="People I Follow"
          description="These are the thought leaders who shape my thinking and approach to business, politics, and life."
        />
        <PersonList people={people} />
      </div>
    </section>
  );
};

// Export the default people for use in other components
export const people = defaultPeople;
