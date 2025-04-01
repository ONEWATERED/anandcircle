
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Upload } from 'lucide-react';
import { FamilyMember } from '@/data/familyData';
import MemberActions from './MemberActions';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import DeleteMemberDialog from './DeleteMemberDialog';

interface MemberTableProps {
  members: FamilyMember[];
  memberImages: Record<string, string | null>;
  loading: boolean;
  onEdit: (memberId: string) => void;
  onDelete: (memberId: string) => void;
  onUploadImage: (memberId: string) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  memberImages,
  loading,
  onEdit,
  onDelete,
  onUploadImage
}) => {
  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            <span className="ml-2">Loading...</span>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Bio</TableHead>
          <TableHead>Social Links</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="relative group">
                <Avatar>
                  <AvatarImage src={memberImages[member.id] || undefined} alt={member.name} />
                  <AvatarFallback style={{ backgroundColor: member.color }}>
                    {member.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onUploadImage(member.id)}
                >
                  <Upload className="h-3 w-3" />
                </Button>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              {member.name}
            </TableCell>
            <TableCell>
              {member.role}
            </TableCell>
            <TableCell className="max-w-[300px] truncate">
              <span title={member.bio}>
                {member.bio.substring(0, 50)}
                {member.bio.length > 50 ? '...' : ''}
              </span>
            </TableCell>
            <TableCell>
              {member.socialLinks ? 
                Object.keys(member.socialLinks).length : 
                0} links
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onEdit(member.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <DeleteMemberDialog 
                    memberName={member.name}
                    onConfirm={() => onDelete(member.id)}
                  />
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MemberTable;
