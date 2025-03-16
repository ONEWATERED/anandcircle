
import React from 'react';
import { ThoughtLeader } from '@/types/thought-leaders';
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Edit, 
  Trash2, 
  Heart, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Check, 
  X 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LeadersListProps {
  leaders: ThoughtLeader[];
  onEdit: (leader: ThoughtLeader) => void;
  onDelete: (id: string) => void;
}

const LeadersList: React.FC<LeadersListProps> = ({ leaders, onEdit, onDelete }) => {
  if (leaders.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-md">
        <p className="text-muted-foreground">No thought leaders found for this category</p>
      </div>
    );
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'family':
        return 'bg-pink-100 text-pink-800';
      case 'business':
        return 'bg-blue-100 text-blue-800';
      case 'health':
        return 'bg-green-100 text-green-800';
      case 'politics':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[80px]">Special</TableHead>
            <TableHead className="w-[100px]">Social Links</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaders.map((leader) => (
            <TableRow key={leader.id}>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={leader.image_url || '/placeholder.svg'} alt={leader.name} />
                  <AvatarFallback>
                    {leader.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                {leader.name}
                {leader.relationship && (
                  <p className="text-xs text-muted-foreground mt-1 max-w-[250px] truncate">
                    {leader.relationship}
                  </p>
                )}
              </TableCell>
              <TableCell>{leader.role}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getCategoryBadgeColor(leader.category)} border-none`}>
                  {leader.category}
                </Badge>
              </TableCell>
              <TableCell>
                {leader.special ? (
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-rose-500 mr-1" fill="#f43f5e" />
                    <span className="text-xs">Yes</span>
                  </div>
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {leader.socialLinks?.some(link => link.platform === 'instagram') && (
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                  )}
                  {leader.socialLinks?.some(link => link.platform === 'twitter') && (
                    <Twitter className="h-4 w-4 text-muted-foreground" />
                  )}
                  {leader.socialLinks?.some(link => link.platform === 'youtube') && (
                    <Youtube className="h-4 w-4 text-muted-foreground" />
                  )}
                  {leader.linkedin_url && (
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(leader)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    onClick={() => onDelete(leader.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadersList;
