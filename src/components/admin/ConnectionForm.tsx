
import React, { useState } from 'react';
import { Connection, SocialLink } from '@/types/thought-leaders';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash, Upload, Plus, Minus } from 'lucide-react';

const CATEGORIES = [
  { value: 'family', label: 'Family' },
  { value: 'politics', label: 'Politics' },
  { value: 'business', label: 'Business' },
  { value: 'health', label: 'Health' },
  { value: 'learning', label: 'Learning' },
  { value: 'unprofessional', label: 'Unprofessional' },
  { value: 'recommended', label: 'Recommended' },
];

interface ConnectionFormProps {
  connection: Partial<Connection> | null;
  onSave: (connection: Partial<Connection>) => Promise<boolean>;
  onCancel: () => void;
  onDelete?: (id: string) => Promise<boolean>;
  onUploadImage?: (file: File, connectionId: string) => Promise<string | null>;
  isNew?: boolean;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({
  connection,
  onSave,
  onCancel,
  onDelete,
  onUploadImage,
  isNew = false
}) => {
  const [formData, setFormData] = useState<Partial<Connection>>(
    connection || {
      name: '',
      role: '',
      category: 'business',
      bio: '',
      special: false,
      order_position: 0,
      socialLinks: []
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    setFormData(prev => {
      const socialLinks = [...(prev.socialLinks || [])];
      if (!socialLinks[index]) {
        socialLinks[index] = { platform: 'twitter', url: '' } as SocialLink;
      }
      socialLinks[index] = { ...socialLinks[index], [field]: value };
      return { ...prev, socialLinks };
    });
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { platform: 'twitter', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData(prev => {
      const socialLinks = [...(prev.socialLinks || [])];
      socialLinks.splice(index, 1);
      return { ...prev, socialLinks };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!connection?.id) return;
    
    if (window.confirm(`Are you sure you want to delete ${connection.name}?`)) {
      setIsDeleting(true);
      try {
        if (onDelete) {
          await onDelete(connection.id);
        }
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage || !connection?.id) return;
    
    setIsUploading(true);
    try {
      const imageUrl = await onUploadImage(file, connection.id);
      if (imageUrl) {
        setFormData(prev => ({ ...prev, image_url: imageUrl }));
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isNew ? 'Add New Connection' : `Edit Connection: ${connection?.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category || 'business'}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Relationship</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order_position">Display Order</Label>
            <Input
              id="order_position"
              name="order_position"
              type="number"
              value={formData.order_position || 0}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="special"
              checked={formData.special || false}
              onCheckedChange={(checked) => handleSwitchChange('special', checked)}
            />
            <Label htmlFor="special">Special Connection</Label>
          </div>

          {!isNew && connection?.id && (
            <div className="space-y-2">
              <Label>Current Image</Label>
              <div className="mt-2">
                {formData.image_url ? (
                  <div className="relative w-32 h-32 rounded overflow-hidden">
                    <img
                      src={formData.image_url}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-muted-foreground">No image uploaded</div>
                )}
              </div>
              <div className="mt-2">
                <Label htmlFor="image" className="block">Upload New Image</Label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUploading}
                      asChild
                    >
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Social Links</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addSocialLink}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Link
              </Button>
            </div>
            
            {(formData.socialLinks || []).map((link, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="w-1/3">
                  <Label htmlFor={`platform-${index}`}>Platform</Label>
                  <Select
                    value={link.platform}
                    onValueChange={(value) => handleSocialLinkChange(index, 'platform', value)}
                  >
                    <SelectTrigger id={`platform-${index}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="anandcircle">Anand Circle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor={`url-${index}`}>URL</Label>
                  <Input
                    id={`url-${index}`}
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    placeholder="https://"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {!isNew && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting || isSubmitting}
              >
                <Trash className="mr-2 h-4 w-4" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isNew ? 'Add Connection' : 'Save Changes'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ConnectionForm;
