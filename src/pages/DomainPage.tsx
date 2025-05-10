
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { domains } from '@/data/domainData';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DomainPage = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const domain = domains.find(d => d.id === domainId);
  
  if (!domain) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Domain Not Found</h1>
          <p className="mb-8">The domain you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const Icon = domain.icon;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Link to="/#passions" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2" size={16} />
          Back to All Domains
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: `${domain.color}20` }}
            >
              <Icon size={36} color={domain.color} />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{domain.title}</h1>
            <p className="text-lg text-gray-600 mb-8">
              {domain.description}
            </p>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Why This Matters</h2>
              <p className="text-gray-600 mb-4">
                This domain is interconnected with others to create holistic solutions that address complex challenges.
              </p>
              <p className="text-gray-600">
                By integrating {domain.title.toLowerCase()} with other areas of expertise, we can drive innovation and deliver measurable impact.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">[Domain Visual]</p>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">Key Initiatives</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Initiative One</h3>
                    <p className="text-sm text-gray-600">Description of a key initiative in this domain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Initiative Two</h3>
                    <p className="text-sm text-gray-600">Description of another key initiative in this domain.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Initiative Three</h3>
                    <p className="text-sm text-gray-600">Description of a third key initiative in this domain.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center">Connect With Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              Connect with experts and enthusiasts in {domain.title} and other interconnected domains. 
              Share insights, collaborate on projects, and drive innovation together.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DomainPage;
