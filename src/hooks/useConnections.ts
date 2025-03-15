
import { useState, useEffect } from 'react';
import { Person } from '@/types/connections';
import { useToast } from '@/hooks/use-toast';

export const useConnections = () => {
  const [connections, setConnections] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load connections from localStorage or default data
  useEffect(() => {
    const loadConnections = async () => {
      setIsLoading(true);
      try {
        // First check localStorage
        const savedConnections = localStorage.getItem('connections');
        if (savedConnections) {
          try {
            const parsedConnections = JSON.parse(savedConnections);
            if (Array.isArray(parsedConnections) && parsedConnections.length > 0) {
              setConnections(parsedConnections);
              console.log('Loaded connections from localStorage:', parsedConnections.length);
            }
          } catch (error) {
            console.error('Error parsing connections data:', error);
            // Fall back to people array from FollowingSection if available
            const defaultConnections = await loadDefaultConnections();
            setConnections(defaultConnections);
          }
        } else {
          // Fall back to people array from FollowingSection if available
          const defaultConnections = await loadDefaultConnections();
          setConnections(defaultConnections);
        }
      } catch (error) {
        console.error('Error loading connections:', error);
        toast({
          title: 'Error',
          description: 'Failed to load connections data.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConnections();
  }, [toast]);
  
  // Load default connections from imported module
  const loadDefaultConnections = async () => {
    try {
      // Dynamic import to avoid circular dependencies
      const module = await import('@/components/FollowingSection');
      if (module.people && Array.isArray(module.people)) {
        console.log('Loaded connections from FollowingSection:', module.people.length);
        return module.people;
      }
      return [];
    } catch (error) {
      console.error('Error loading default connections:', error);
      return [];
    }
  };
  
  // Save connections to localStorage
  const saveConnections = (updatedConnections: Person[]) => {
    try {
      localStorage.setItem('connections', JSON.stringify(updatedConnections));
      toast({
        title: 'Success',
        description: 'Connections saved successfully.',
      });
    } catch (error) {
      console.error('Error saving connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to save connections data.',
        variant: 'destructive'
      });
    }
  };

  // Add a new connection
  const addConnection = (newConnectionData: Partial<Person>) => {
    if (!newConnectionData.name || !newConnectionData.role || !newConnectionData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    
    const id = newConnectionData.name.toLowerCase().replace(/\s+/g, '-');
    const newConnection: Person = {
      id,
      name: newConnectionData.name,
      role: newConnectionData.role,
      category: newConnectionData.category,
      image: newConnectionData.image || '/placeholder.svg',
      special: newConnectionData.special || false,
      relationship: newConnectionData.relationship || '',
      socialLinks: newConnectionData.socialLinks || [],
      order: connections.length + 1
    };
    
    const updatedConnections = [...connections, newConnection];
    setConnections(updatedConnections);
    saveConnections(updatedConnections);
    
    return newConnection;
  };

  // Update an existing connection
  const updateConnection = (updatedConnection: Person) => {
    const updatedConnections = connections.map(conn => 
      conn.id === updatedConnection.id ? updatedConnection : conn
    );
    
    setConnections(updatedConnections);
    saveConnections(updatedConnections);
  };

  // Delete a connection
  const deleteConnection = (id: string) => {
    const updatedConnections = connections.filter(conn => conn.id !== id);
    setConnections(updatedConnections);
    saveConnections(updatedConnections);
  };

  return {
    connections,
    isLoading,
    addConnection,
    updateConnection,
    deleteConnection,
    setConnections
  };
};
