
import React from 'react';

interface FollowingHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export const FollowingHeader: React.FC<FollowingHeaderProps> = ({
  title,
  subtitle,
  description
}) => {
  return (
    <div className="text-center">
      <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">{title}</h2>
      <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        {subtitle}
      </p>
      <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
        {description}
      </p>
    </div>
  );
};
