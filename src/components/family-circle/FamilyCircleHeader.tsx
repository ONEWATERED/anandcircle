
import React from 'react';

const FamilyCircleHeader: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
        My Family Circle
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto">
        The wonderful people who make life meaningful every day.
        <span className="block text-xs mt-2 text-slate-500">Click on a family member to see their details</span>
      </p>
    </div>
  );
};

export default FamilyCircleHeader;
