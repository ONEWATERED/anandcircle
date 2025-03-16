
import { useEffect, useState } from 'react';
import { Person } from '@/types/connections';
import { Connection } from '@/types/thought-leaders';
import { connectionToPerson, defaultPeople } from './connectionUtils';

export const useLocalConnections = () => {
  const [people, setPeople] = useState<Person[]>([]);
  
  useEffect(() => {
    // Load connections from localStorage (synced from database)
    const loadSyncedConnections = () => {
      const savedConnections = localStorage.getItem('connections');
      if (savedConnections) {
        try {
          const parsedConnections = JSON.parse(savedConnections) as Connection[];
          if (Array.isArray(parsedConnections) && parsedConnections.length > 0) {
            // Convert Connection[] to Person[]
            const convertedPeople = parsedConnections.map(connectionToPerson);
            setPeople(convertedPeople);
            console.log('Loaded connections from localStorage:', convertedPeople.length);
            return;
          }
        } catch (error) {
          console.error('Error parsing connections data:', error);
        }
      }
      
      // Fallback to default data
      setPeople(defaultPeople);
    };
    
    loadSyncedConnections();
    
    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'connections') {
        loadSyncedConnections();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { people };
};
