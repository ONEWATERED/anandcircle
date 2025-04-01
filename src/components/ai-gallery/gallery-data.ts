
import { CloudRain, FileDigit, Waves, Droplets, Brain, HeartPulse } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Define categories for filtering
export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'water', label: 'Water' },
  { id: 'health', label: 'Health' },
  { id: 'climate', label: 'Climate Change' },
  { id: 'data', label: 'Data' },
  { id: 'productivity', label: 'Productivity' }
];

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  icon: LucideIcon;
  imagePath?: string;
}

export const imageData: GalleryItem[] = [
  {
    id: 1,
    title: 'One Water Circle - Data Language',
    description: 'Learn the language of data and join the One Water Circle community.',
    category: 'data',
    url: 'https://www.onewater.ai',
    icon: Brain,
    imagePath: '/lovable-uploads/4b1fcb91-ddc1-401c-9ada-24cae2d79d50.png'
  },
  {
    id: 2,
    title: 'Coastal Flooding Simulation',
    description: 'High-resolution visualization of coastal flooding impact on urban infrastructure',
    category: 'climate',
    url: '',
    icon: CloudRain
  },
  {
    id: 3,
    title: 'Water Data Visualization',
    description: 'Abstract representation of water quality data from IoT sensors',
    category: 'water',
    url: '',
    icon: FileDigit
  },
  {
    id: 4,
    title: 'Ocean Current Patterns',
    description: 'Detailed visualization of changing ocean current patterns due to climate change',
    category: 'climate',
    url: '',
    icon: Waves
  },
  {
    id: 5,
    title: 'Rainfall Distribution Model',
    description: 'AI-generated rainfall distribution model showing changing patterns over decades',
    category: 'climate',
    url: '',
    icon: Droplets
  },
  {
    id: 6,
    title: 'Glacier Retreat Timeline',
    description: 'Visual timeline showing the accelerated retreat of key global glaciers',
    category: 'climate',
    url: '',
    icon: CloudRain
  },
  {
    id: 7,
    title: 'Health Data Metrics',
    description: 'Visualization of key health metrics and their interconnections',
    category: 'health',
    url: '',
    icon: HeartPulse
  },
  {
    id: 8,
    title: 'Productivity Framework',
    description: 'Visual guide to optimizing productivity through data-driven decisions',
    category: 'productivity',
    url: '',
    icon: Brain
  }
];
