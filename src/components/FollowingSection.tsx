
import React, { useEffect, useState } from 'react';
import { FollowingHeader } from './following/FollowingHeader';
import { PersonList } from './following/PersonList';
import { useLocalConnections } from './following/UseLocalConnections';
import { supabase } from "@/integrations/supabase/client";
import { Person } from '@/types/connections';
import { connectionToPerson } from './following/connectionUtils';

export const FollowingSection: React.FC = () => {
  const { people: localPeople } = useLocalConnections();
  const [people, setPeople] = useState<Person[]>(localPeople);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      setIsLoading(true);
      try {
        // Get connections from the database
        const { data: connectionsData, error } = await supabase
          .from('connections')
          .select('*')
          .order('category')
          .order('order_position', { nullsFirst: false })
          .order('name');

        if (error) {
          console.error("Error fetching connections:", error);
          // If we can't fetch from DB, use local connections
          setPeople(localPeople);
          return;
        }

        if (connectionsData && connectionsData.length > 0) {
          // Convert connections to Person[] format
          const convertedPeople = connectionsData.map(connection => ({
            id: connection.id,
            name: connection.name,
            role: connection.role,
            category: connection.category,
            relationship: connection.bio,
            image: connection.image_url,
            special: connection.special || false
          }));
          
          setPeople(convertedPeople);
          console.log("Loaded connections from Supabase:", convertedPeople.length);
        } else {
          // If no connections in DB, use local connections
          setPeople(localPeople);
        }
      } catch (error) {
        console.error("Error in fetchConnections:", error);
        setPeople(localPeople);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [localPeople]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FollowingHeader 
          title="Network"
          subtitle="People I Follow"
          description="These are the thought leaders who shape my thinking and approach to business, politics, and life."
        />
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <PersonList people={people} />
        )}
      </div>
    </section>
  );
};

// We don't export the default people from this component anymore
// as it's now handled by useLocalConnections
