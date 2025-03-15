
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FamilyCircleGraphic from './FamilyCircleGraphic';
import { FamilyMember } from '@/data/familyData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, Heart, Dog } from 'lucide-react';

const FamilyCircleSection = () => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const getAvatarIcon = (role: string) => {
    if (role.toLowerCase().includes('pet')) return <Dog size={24} />;
    if (role.toLowerCase().includes('spouse')) return <Heart size={24} />;
    return <Users size={24} />;
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Family Circle
          </motion.h2>
          <motion.p 
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The wonderful people who make life meaningful every day.
            <span className="block text-xs mt-2 text-slate-500">Click on a family member to see more information</span>
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="w-full">
            <FamilyCircleGraphic onSelectMember={setSelectedMember} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyCircleSection;
