
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { validateUrl } from './socialLinksService';
import { Control } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

interface SocialLinkFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
}

const SocialLinkField: React.FC<SocialLinkFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  icon: Icon
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center">
            <Icon className="mr-2" size={16} />
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className={!validateUrl(field.value) ? "border-red-500" : ""}
            />
          </FormControl>
          {!validateUrl(field.value) && (
            <FormMessage>Please enter a valid URL</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default SocialLinkField;
