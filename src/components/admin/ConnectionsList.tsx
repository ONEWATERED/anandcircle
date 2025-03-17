
import React from 'react';
import { Connection } from '@/types/thought-leaders';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Star, ExternalLink } from 'lucide-react';

interface ConnectionsListProps {
  connections: Connection[];
  onSelect: (connection: Connection) => void;
  onAddNew: () => void;
  isLoading?: boolean;
}

const ConnectionsList: React.FC<ConnectionsListProps> = ({
  connections,
  onSelect,
  onAddNew,
  isLoading = false
}) => {
  // Group connections by category
  const groupedConnections = connections.reduce(
    (acc, connection) => {
      if (!acc[connection.category]) {
        acc[connection.category] = [];
      }
      acc[connection.category].push(connection);
      return acc;
    },
    {} as Record<string, Connection[]>
  );

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedConnections).sort();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">People I Follow</h2>
        <Button onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {connections.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">No connections found</p>
            <Button onClick={onAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Connection
            </Button>
          </CardContent>
        </Card>
      ) : (
        sortedCategories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-medium capitalize mb-3">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedConnections[category].map((connection) => (
                <Card 
                  key={connection.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onSelect(connection)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{connection.name}</CardTitle>
                        <CardDescription>{connection.role}</CardDescription>
                      </div>
                      {connection.special && (
                        <Badge className="bg-amber-500">
                          <Star className="h-3 w-3 mr-1" />
                          Special
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        {connection.image_url ? (
                          <img 
                            src={connection.image_url} 
                            alt={connection.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            {connection.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        {connection.bio && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {connection.bio}
                          </p>
                        )}
                        {connection.socialLinks && connection.socialLinks.length > 0 && (
                          <div className="flex mt-2 gap-2">
                            {connection.socialLinks.map((link, index) => (
                              <a 
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConnectionsList;
