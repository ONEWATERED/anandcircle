
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CreditCard, Droplet, ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  iconBgClass: string;
  onGetStarted: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  price,
  description,
  icon,
  iconBgClass,
  onGetStarted,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="neo-glass p-8 text-center"
    >
      <div className={`w-16 h-16 ${iconBgClass} rounded-full flex items-center justify-center mx-auto mb-6`}>
        {icon}
      </div>
      <h4 className="text-2xl font-semibold mb-2">{title}</h4>
      <div className="flex items-center justify-center mb-4">
        <CreditCard className="text-primary mr-2" size={20} />
        <span className="text-xl font-bold">{price}</span>
      </div>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
        <Droplet className="text-cyan-500 mr-2" size={16} />
        <p>100% of proceeds donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">One Water Foundation</a></p>
      </div>
      <Button onClick={onGetStarted} className="w-full flex items-center justify-center gap-2">
        Get Started <ExternalLink size={16} />
      </Button>
    </motion.div>
  );
};

export default ServiceCard;
