
import React, { useState, useEffect } from 'react';
import { ThoughtLeader, SocialLink } from '@/types/thought-leaders';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { supabase } from '@/integrations/supabase/client';

interface LeaderFormDialogProps {
  leader: ThoughtLeader | null;
  onSave: (leader: ThoughtLeader, socialLinks: SocialLink[]) => void;
  onCancel: () => void;
}

const LeaderFormDialog: React.FC<LeaderFormDialogProps> = ({ leader, onSave, onCancel }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<ThoughtLeader>({
    id: '',
    name: '',
    role: '',
    category: 'business',
    special: false,
    relationship: '',
    image_url: '',
    linkedin_url: '',
    order_position: 0
  });
  
  // Social links state
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  // Initialize form with leader data if editing
  useEffect(() => {
    if (leader) {
      setFormData({
        ...leader,
        order_position: leader.order_position || 0
      });
      setSocialLinks(leader.socialLinks || []);
    } else {
      // Generate a unique ID for new leader based on timestamp
      setFormData({
        ...formData,
        id: `leader-${Date.now()}`
      });
    }
  }, [leader]);

  const handleClose = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, special: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload image to Supabase storage
      const imageUrl = await uploadImageToStorage(file, 'thought-leaders');
      
      if (imageUrl) {
        setFormData(prev => ({ ...prev, image_url: imageUrl }));
        toast({
          title: 'Success',
          description: 'Image uploaded successfully'
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: 'instagram', url: '' }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Filter out any invalid social links
      const validSocialLinks = socialLinks.filter(link => link.url.trim() !== '');
      
      // Call onSave with updated data
      await onSave(formData, validSocialLinks);
      
      // Close dialog
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving thought leader:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{leader ? 'Edit Thought Leader' : 'Add Thought Leader'}</DialogTitle>
          <DialogDescription>
            {leader ? 'Update this thought leader\'s information' : 'Add a new thought leader to your connections'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                {isUploading ? (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                  </div>
                ) : (
                  <>
                    <AvatarImage 
                      src={formData.image_url || '/placeholder.svg'} 
                      alt={formData.name} 
                    />
                    <AvatarFallback>
                      {formData.name 
                        ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
                        : 'TL'
                      }
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <Label htmlFor="image-upload" className="absolute -bottom-2 -right-2 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer">
                <Camera size={16} />
              </Label>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Position *</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g. Entrepreneur, Author, etc."
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="special"
                  checked={formData.special || false}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="special">Mark as special connection</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship/Description</Label>
            <Textarea
              id="relationship"
              name="relationship"
              value={formData.relationship || ''}
              onChange={handleInputChange}
              placeholder="Describe your relationship or why they inspire you"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="recommended">Recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="order_position">Display Order</Label>
              <Input
                id="order_position"
                name="order_position"
                type="number"
                value={formData.order_position || 0}
                onChange={handleInputChange}
                placeholder="Display order (lower numbers first)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url || ''}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Social Media Links</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addSocialLink}
              >
                <Plus size={14} className="mr-1" />
                Add Link
              </Button>
            </div>
            
            {socialLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Select
                  value={link.platform}
                  onValueChange={(value) => updateSocialLink(index, 'platform', value as 'instagram' | 'youtube' | 'twitter')}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder={`https://${link.platform}.com/...`}
                />
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <Trash2 size={16} className="text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {leader ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderFormDialog;
