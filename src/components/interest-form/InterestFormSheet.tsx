
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Bot, UserRound, Droplet, Send, Check } from 'lucide-react';
import { FormValues, formSchema } from './FormSchema';

interface InterestFormSheetProps {
  isOpen: boolean;
  type: 'avatar' | 'profile' | 'none';
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmit: (data: FormValues) => void;
  onClose: () => void;
}

const InterestFormSheet: React.FC<InterestFormSheetProps> = ({
  isOpen,
  type,
  isSubmitting,
  isSubmitted,
  onSubmit,
  onClose,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const isAvatar = type === 'avatar';
  const title = isAvatar ? 'Digital Avatar Interest' : 'Professional Profile Interest';
  const price = isAvatar ? '$3,000' : '$500';
  const icon = isAvatar ? <Bot className="mr-2 text-primary" /> : <UserRound className="mr-2 text-accent" />;
  const messagePlaceholder = isAvatar 
    ? "Tell us about your goals or any specific requirements" 
    : "Tell us about your professional goals or requirements";

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl flex items-center">
            {icon}
            {title}
          </SheetTitle>
          <SheetDescription>
            Complete this form to register your interest in creating a {isAvatar ? 'personal AI avatar' : 'professional profile'}. Price: {price}
          </SheetDescription>
        </SheetHeader>
        
        {!isSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={messagePlaceholder}
                        className="resize-none"
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-2 text-xs text-muted-foreground">
                <p className="flex items-center">
                  <Droplet className="mr-1 text-cyan-500" size={14} />
                  100% of proceeds donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">One Water Foundation</a>
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit <Send size={16} />
                    </span>
                  )}
                </Button>
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>
              </div>
            </form>
          </Form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Thank You!</h4>
            <p className="text-muted-foreground mb-6">
              Your interest has been submitted successfully. We'll be in touch with you soon about creating your {isAvatar ? 'digital avatar' : 'professional profile'}.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default InterestFormSheet;
