
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Story = () => {
  return (
    <div id="story" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
          My Story
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From innovative startups to public service leadership, my journey has been defined by a commitment to leveraging technology for positive change.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="space-y-6">
          <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Executive Director, Miami-Dade Water & Sewer</h3>
            <p className="text-gray-600">
              Leading one of the largest water utilities in the US, serving 2.3 million customers with a $987M budget and 2,700 employees. Implementing AI-driven solutions for water management efficiency.
            </p>
            <span className="block text-sm text-gray-500 mt-2">2019 - Present</span>
          </div>
          
          <div className="relative pl-8 border-l-2 border-gray-200 pb-6">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-secondary"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chief Innovation Officer, Miami-Dade County</h3>
            <p className="text-gray-600">
              Led digital transformation initiatives across all county departments. Developed and implemented data-driven strategies to improve citizen services.
            </p>
            <span className="block text-sm text-gray-500 mt-2">2016 - 2019</span>
          </div>
          
          <div className="relative pl-8 border-l-2 border-gray-200">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Founder & CEO, GovTech Startups</h3>
            <p className="text-gray-600">
              Founded multiple successful government technology startups focused on smart city solutions and public service optimization.
            </p>
            <span className="block text-sm text-gray-500 mt-2">2010 - 2016</span>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Education & Certifications</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowUpRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">MBA, Harvard Business School</p>
                  <p className="text-sm text-gray-600">Business Administration with focus on Public Sector Innovation</p>
                </div>
              </li>
              <li className="flex items-start">
                <ArrowUpRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">MS, MIT</p>
                  <p className="text-sm text-gray-600">Computer Science with specialization in AI applications</p>
                </div>
              </li>
              <li className="flex items-start">
                <ArrowUpRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Certified Digital Transformation Expert</p>
                  <p className="text-sm text-gray-600">Harvard University Executive Education</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Recognition & Awards</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowUpRight className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">White House Champions of Change</p>
                  <p className="text-sm text-gray-600">Recognized for innovation in government technology</p>
                </div>
              </li>
              <li className="flex items-start">
                <ArrowUpRight className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Top 40 Under 40 in Government Technology</p>
                  <p className="text-sm text-gray-600">GovTech Magazine</p>
                </div>
              </li>
              <li className="flex items-start">
                <ArrowUpRight className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Public Service Innovation Award</p>
                  <p className="text-sm text-gray-600">American Society for Public Administration</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
