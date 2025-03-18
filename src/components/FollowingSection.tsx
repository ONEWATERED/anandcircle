
import React, { useEffect, useState } from 'react';
import { FollowingHeader } from './following/FollowingHeader';
import { PersonList } from './following/PersonList';
import { supabase } from "@/integrations/supabase/client";
import { Person } from '@/types/connections';

export const FollowingSection: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
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
          setPeople([]);
          return;
        }

        if (connectionsData && connectionsData.length > 0) {
          // Convert connections to Person[] format with proper type casting
          const convertedPeople = connectionsData.map(connection => ({
            id: connection.id,
            name: connection.name,
            role: connection.role,
            // Explicitly cast the category to the expected union type
            category: connection.category as Person['category'],
            relationship: connection.bio,
            image: connection.image_url,
            special: connection.special || false
          }));
          
          setPeople(convertedPeople);
          console.log("Loaded connections from Supabase:", convertedPeople.length);
        } else {
          // If the database returned no connections, show empty list
          console.log("No connections found in database");
          setPeople([]);
        }
      } catch (error) {
        console.error("Error in fetchConnections:", error);
        setPeople([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, []);

  return (
    <section className="w-full py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FollowingHeader 
          title="Network"
          subtitle="People I Follow"
          description="These are the thought leaders who shape my thinking and approach to business, politics, and life."
        />
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="w-full mt-8">
            {people.length === 0 ? (
              <div className="text-center py-12 bg-black/20 rounded-lg border border-white/10">
                <p className="text-gray-400">No connections available. Add connections from the admin panel.</p>
              </div>
            ) : (
              <PersonList people={people} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
