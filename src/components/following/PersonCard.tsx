
import React from 'react';
import { Person } from '@/types/connections';
import { User } from 'lucide-react';

interface PersonCardProps {
  person: Person;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0 h-48 bg-slate-100 flex items-center justify-center">
        <User className="h-16 w-16 text-slate-400" />
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
  );
};
