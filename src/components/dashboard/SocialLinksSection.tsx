
import React from 'react';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Check, Users, Linkedin, Twitter, Youtube, Music } from 'lucide-react';
import { toast } from 'sonner';
import { saveSocialLinks } from '@/utils/imageLoader';

export interface SocialLinksFormValues {
  linkedInUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
  anandCircleUrl: string;
}

interface SocialLinksSectionProps {
  initialValues: SocialLinksFormValues;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ initialValues }) => {
  const socialLinksForm = useForm<SocialLinksFormValues>({
    defaultValues: initialValues
  });
  
  const handleSocialLinkChange = async () => {
    const data = socialLinksForm.getValues();
    await saveSocialLinks({
      linkedIn: data.linkedInUrl,
      twitter: data.twitterUrl,
      youtube: data.youtubeUrl,
      spotify: data.spotifyUrl,
      anandCircle: data.anandCircleUrl
    });
  };

  const onSocialLinksSubmit = async (data: SocialLinksFormValues) => {
    try {
      await saveSocialLinks({
        linkedIn: data.linkedInUrl,
        twitter: data.twitterUrl,
        youtube: data.youtubeUrl,
        spotify: data.spotifyUrl,
        anandCircle: data.anandCircleUrl
      });
      
      toast.success('Social links updated successfully!');
    } catch (error) {
      toast.error('Failed to update social links');
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
        <Users className="mr-2" size={20} />
        Social Links
      </h2>
      
      <Form {...socialLinksForm}>
        <form onChange={handleSocialLinkChange} onSubmit={socialLinksForm.handleSubmit(onSocialLinksSubmit)} className="space-y-4">
          <FormField
            control={socialLinksForm.control}
            name="linkedInUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Linkedin className="mr-2" size={16} />
                  LinkedIn URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Twitter className="mr-2" size={16} />
                  Twitter URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/yourhandle"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Youtube className="mr-2" size={16} />
                  YouTube URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/@youraccount"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="spotifyUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Music className="mr-2" size={16} />
                  Spotify URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://open.spotify.com/user/youraccount"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="anandCircleUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2" size={16} />
                  ANAND Circle URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="#anand-circle"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="mt-4">
            <Save className="mr-2 h-4 w-4" />
            Save All Social Links
          </Button>
          
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Check className="text-green-500 mr-2" size={16} />
            <span>Changes are automatically saved</span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SocialLinksSection;
