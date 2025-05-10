
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Save, Check, Users, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import { saveSocialLinks, validateUrl, SocialLinksData } from './socialLinksService';
import SocialLinkField from './SocialLinkField';

export interface SocialLinksFormValues {
  linkedInUrl: string;
  anandCircleUrl: string;
  spotifyUrl: string; // Keep for backward compatibility
}

interface SocialLinksFormProps {
  initialValues: SocialLinksFormValues;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ initialValues }) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const socialLinksForm = useForm<SocialLinksFormValues>({
    defaultValues: initialValues
  });
  
  const handleSocialLinkChange = async () => {
    const data = socialLinksForm.getValues();
    
    // Validate URLs before auto-saving
    if (!validateUrl(data.linkedInUrl)) {
      return;
    }
    
    await saveSocialLinks({
      linkedIn: data.linkedInUrl,
      spotify: data.spotifyUrl, // Keep for backward compatibility
      anandCircle: data.anandCircleUrl
    });
  };

  const onSocialLinksSubmit = async (data: SocialLinksFormValues) => {
    // Validate all URLs
    if (!validateUrl(data.linkedInUrl)) {
      toast.error('Please correct invalid URLs');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const result = await saveSocialLinks({
        linkedIn: data.linkedInUrl,
        spotify: data.spotifyUrl, // Keep for backward compatibility
        anandCircle: data.anandCircleUrl
      });
      
      if (result) {
        toast.success('Social links updated successfully!');
      } else {
        toast.error('Failed to update social links');
      }
    } catch (error) {
      console.error('Error saving social links:', error);
      toast.error('Failed to update social links');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...socialLinksForm}>
      <form onChange={handleSocialLinkChange} onSubmit={socialLinksForm.handleSubmit(onSocialLinksSubmit)} className="space-y-4">
        <SocialLinkField
          control={socialLinksForm.control}
          name="linkedInUrl"
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/yourprofile"
          icon={Linkedin}
        />
        
        <SocialLinkField
          control={socialLinksForm.control}
          name="anandCircleUrl"
          label="ANAND Circle URL"
          placeholder="#anand-circle"
          icon={Users}
        />
        
        <Button type="submit" className="mt-4" disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Social Links
            </>
          )}
        </Button>
        
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Check className="text-green-500 mr-2" size={16} />
          <span>Valid changes are automatically saved</span>
        </div>
      </form>
    </Form>
  );
};

export default SocialLinksForm;
