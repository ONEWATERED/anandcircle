
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import type { FamilyMember } from '@/data/familyData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface FamilyMemberCardBackProps {
  member: FamilyMember;
  nodeIconSize: number;
}

const FamilyMemberCardBack: React.FC<FamilyMemberCardBackProps> = ({ member, nodeIconSize }) => {
  const Icon = member.icon;
  
  return (
    <motion.div 
      className="rounded-xl bg-white/90 backdrop-blur-sm flex flex-col items-center p-3 w-full h-full border-2 shadow-lg"
      style={{ borderColor: member.color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center mb-2">
        <Avatar className="h-10 w-10 border-2" style={{ borderColor: member.color }}>
          <AvatarImage src={member.photoUrl} alt={member.name} />
          <AvatarFallback>
            <Icon size={16} />
          </AvatarFallback>
        </Avatar>
        <div className="ml-2 text-left">
          <h3 className="font-bold text-sm">{member.name}</h3>
          <p className="text-xs text-slate-500">{member.role}</p>
        </div>
      </div>
      
      <p className="text-xs text-slate-700 mb-2 overflow-y-auto max-h-16 text-center">{member.bio}</p>
      
      {member.socialLinks && (
        <div className="flex justify-center space-x-2 mt-auto">
          {member.socialLinks.twitter && (
            <a 
              href={member.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Twitter size={14} className="text-blue-400" />
            </a>
          )}
          
          {member.socialLinks.instagram && (
            <a 
              href={member.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-pink-100 transition-colors"
            >
              <Instagram size={14} className="text-pink-500" />
            </a>
          )}
          
          {member.socialLinks.linkedin && (
            <a 
              href={member.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Linkedin size={14} className="text-blue-700" />
            </a>
          )}
          
          {member.socialLinks.facebook && (
            <a 
              href={member.socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Facebook size={14} className="text-blue-600" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default FamilyMemberCardBack;
