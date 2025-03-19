
import React from 'react';
import { FollowingHeader } from './following/FollowingHeader';
import { PersonList } from './following/PersonList';
import { defaultPeople } from './following/connectionUtils';

export const FollowingSection: React.FC = () => {
  return (
    <section className="w-full py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FollowingHeader 
          title="Network"
          subtitle="People I Follow"
          description="These are the thought leaders who shape my thinking and approach to business, politics, and life."
        />
        <div className="w-full mt-8">
          <PersonList people={defaultPeople} />
        </div>
      </div>
    </section>
  );
};
