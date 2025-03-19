
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type PassionCardProps = {
  title: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  colorAccent: string;
  index: number;
  link?: string;
};

const PassionCard = ({
  title,
  description,
  colorAccent,
  index,
  link
}: PassionCardProps) => {
  return (
    <motion.div 
      className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white opacity-50"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Top accent bar */}
        <div className={cn('h-1 w-16 rounded-full mb-5', colorAccent)}></div>
        
        <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-primary transition-colors duration-300">{title}</h3>
        
        <p className="text-slate-700 text-sm flex-grow mb-4">
          {description}
        </p>

        {link && (
          <div className="mt-auto pt-2">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
            >
              Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
        
        {/* Bottom design elements */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full"></div>
      </div>
      
      {/* Border highlight effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-300"></div>
    </motion.div>
  );
};

export default PassionCard;
