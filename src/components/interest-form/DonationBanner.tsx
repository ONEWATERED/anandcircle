
import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

const DonationBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6 rounded-xl border border-gray-200 inline-flex items-center gap-4 mx-auto"
    >
      <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center shrink-0">
        <HeartHandshake size={24} className="text-cyan-500" />
      </div>
      <div className="text-left">
        <h4 className="text-lg font-semibold mb-1">Supporting One Water</h4>
        <p className="text-muted-foreground text-sm">
          100% of proceeds from our services are donated to 
          <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline ml-1">
            One Water Foundation
          </a>, 
          supporting sustainable water solutions globally.
        </p>
      </div>
    </motion.div>
  );
};

export default DonationBanner;
