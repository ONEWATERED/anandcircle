
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
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
            The wonderful people who make life meaningful every day
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="w-full lg:w-3/4">
            <FamilyCircleGraphic onSelectMember={setSelectedMember} />
          </div>
          
          <div className="w-full lg:w-1/4">
            {selectedMember ? (
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={selectedMember.id}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2" style={{ borderColor: selectedMember.color }}>
                    <AvatarImage src={selectedMember.photoUrl} alt={selectedMember.name} />
                    <AvatarFallback>
                      {getAvatarIcon(selectedMember.role)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{selectedMember.name}</h3>
                    <p className="text-sm text-slate-500">{selectedMember.role}</p>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-0">{selectedMember.bio}</p>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-slate-100 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-slate-500 italic">Select a family member to view their bio</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyCircleSection;
