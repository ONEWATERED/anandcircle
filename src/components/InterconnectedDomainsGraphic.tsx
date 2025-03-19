
import React from 'react';
import { domains } from '@/data/domainData';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterconnectedDomainsGraphic = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-2">
        {domains.map((domain) => {
          const Icon = domain.icon;
          
          return (
            <div 
              key={domain.id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${domain.color}20` }}
              >
                <Icon size={28} color={domain.color} />
              </div>
              
              <h3 className="text-base font-medium mb-2">{domain.title}</h3>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {domain.description}
              </p>
              
              <Link to={`/domains/${domain.id}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-2"
                >
                  Learn More <ExternalLink className="ml-1" size={14} />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterconnectedDomainsGraphic;
