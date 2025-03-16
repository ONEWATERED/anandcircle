
import React from 'react';
import { Person } from '@/types/connections';
import { PersonCard } from './PersonCard';

interface PersonListProps {
  people: Person[];
}

export const PersonList: React.FC<PersonListProps> = ({ people }) => {
  return (
    <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
};
