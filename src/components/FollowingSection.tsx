import React, { useEffect, useState } from 'react';
import { Person } from '@/types/connections';
import { Connection } from '@/types/thought-leaders';

// Define a conversion function to transform Connection to Person type
const connectionToPerson = (connection: Connection): Person => ({
  id: connection.id,
  name: connection.name,
  role: connection.role,
  category: connection.category as any, // Type cast needed here
  image: connection.image_url || undefined,
  special: connection.special || false,
  relationship: connection.bio || undefined,
  socialLinks: connection.socialLinks?.map(link => ({
    platform: link.platform as any,
    url: link.url
  }))
});

export const FollowingSection: React.FC = () => {
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

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Network</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            People I Follow
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            These are the thought leaders who shape my thinking and approach to business, politics, and life.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {people.map((person) => (
            <div key={person.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
                  alt={person.name}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <span className="capitalize">{person.category}</span>
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{person.name}</p>
                    <p className="mt-1 text-base text-gray-500">{person.role}</p>
                  </div>
                  {person.relationship && (
                    <p className="mt-3 text-sm text-gray-500 italic">"{person.relationship}"</p>
                  )}
                </div>
                {person.special && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                      Special Connection
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Keep a fallback list of default people
const defaultPeople: Person[] = [
  {
    id: "sam-altman",
    name: "Sam Altman",
    role: "CEO of OpenAI",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg",
    relationship: "Sam's vision for AI and humanity's future is unparalleled."
  },
  {
    id: "marc-andreessen",
    name: "Marc Andreessen",
    role: "Co-founder of a16z",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1369435367/ma-twitter-4_400x400.jpg",
    relationship: "Marc's thinking on technology and progress has deeply influenced me."
  },
  {
    id: "paul-graham",
    name: "Paul Graham",
    role: "Co-founder of Y Combinator",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1824002576/pg-railsconf_400x400.jpg"
  },
  {
    id: "balaji-srinivasan",
    name: "Balaji Srinivasan",
    role: "Angel Investor & Entrepreneur",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1609979110158299137/63gWQeMQ_400x400.jpg",
    special: true
  },
  {
    id: "vitalik-buterin",
    name: "Vitalik Buterin",
    role: "Creator of Ethereum",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg"
  },
  {
    id: "naval-ravikant",
    name: "Naval Ravikant",
    role: "AngelList Co-founder",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg",
    special: true,
    relationship: "Naval's insights on wealth creation and happiness have changed my perspective."
  },
  {
    id: "patrick-collison",
    name: "Patrick Collison",
    role: "CEO of Stripe",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1320076285169917952/zQUrdqxK_400x400.jpg"
  },
  {
    id: "andrew-yang",
    name: "Andrew Yang",
    role: "Forward Party Founder",
    category: "politics",
    image: "https://pbs.twimg.com/profile_images/1250921081460633602/QvBD597y_400x400.jpg"
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    role: "CEO of Tesla, SpaceX, X",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg",
    special: true,
    relationship: "Elon's ambition and execution ability are truly inspiring."
  },
  {
    id: "peter-thiel",
    name: "Peter Thiel",
    role: "Founder of Palantir",
    category: "business",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Peter_Thiel_by_Gage_Skidmore.jpg"
  },
  {
    id: "jordan-peterson",
    name: "Jordan Peterson",
    role: "Psychologist & Author",
    category: "learning",
    image: "https://pbs.twimg.com/profile_images/1602752936935124993/s_jgHEu3_400x400.jpg"
  },
  {
    id: "lex-fridman",
    name: "Lex Fridman",
    role: "AI Researcher & Podcaster",
    category: "learning",
    image: "https://pbs.twimg.com/profile_images/1475597165051080705/0gLU-JUK_400x400.jpg",
    relationship: "Lex's thoughtful conversations have expanded my understanding of AI and humanity."
  }
];

export const people = defaultPeople;
