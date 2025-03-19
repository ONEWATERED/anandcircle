
import { Publication } from '@/types/publications';

// For demo purposes, mock data. In a real app, this would come from an API
export const healthResources: Publication[] = [
  {
    id: 1,
    title: "Biomarkers for Optimal Health",
    description: "A comprehensive guide to understanding key biomarkers and what they reveal about your health status.",
    thumbnailUrl: "",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Nutrition & Brain Health",
    description: "Discover the nutrients that support cognitive function and protect against neurodegeneration.",
    thumbnailUrl: "",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Sleep Optimization Protocol",
    description: "Evidence-based strategies to improve sleep quality and duration for better health outcomes.",
    thumbnailUrl: "",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Stress Resilience Techniques",
    description: "Practical approaches to build resilience and manage stress in high-pressure environments.",
    thumbnailUrl: "",
    pdfUrl: "#",
    hasVideo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];
