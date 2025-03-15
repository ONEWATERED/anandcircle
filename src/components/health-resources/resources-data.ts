
import { Publication } from '@/types/publications';

// For demo purposes, mock data. In a real app, this would come from an API
export const healthResources: Publication[] = [
  {
    id: 1,
    title: "Biomarkers for Optimal Health",
    description: "A comprehensive guide to understanding key biomarkers and what they reveal about your health status.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Nutrition & Brain Health",
    description: "Discover the nutrients that support cognitive function and protect against neurodegeneration.",
    thumbnailUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Sleep Optimization Protocol",
    description: "Evidence-based strategies to improve sleep quality and duration for better health outcomes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Stress Resilience Techniques",
    description: "Practical approaches to build resilience and manage stress in high-pressure environments.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];
