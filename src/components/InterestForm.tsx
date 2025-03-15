
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  Bot, 
  UserRound, 
  HeartHandshake, 
  Send, 
  Check, 
  X,
  CreditCard,
  Droplet
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const InterestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSheet, setActiveSheet] = useState<'none' | 'avatar' | 'profile'>('none');
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", data, "for", activeSheet);
      setIsSubmitted(true);
      
      toast({
        title: "Interest Submitted",
        description: "Thank you for your interest! We'll be in touch soon.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your interest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndCloseForm = () => {
    form.reset();
    setIsSubmitted(false);
    setActiveSheet('none');
  };

  const openAvatarSheet = () => {
    setActiveSheet('avatar');
    setIsSubmitted(false);
  };

  const openProfileSheet = () => {
    setActiveSheet('profile');
    setIsSubmitted(false);
  };

  return (
    <section id="interest-form" className="py-16 md:py-24 bg-gradient-to-br from-gray-100 to-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">Create Your Own</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Interested in Your Personal Digital Experience?</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your own digital presence with our premium services. All proceeds are donated to support 
            sustainable water solutions globally through One Water Foundation.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Digital Avatar Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="neo-glass p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot size={32} className="text-primary" />
              </div>
              <h4 className="text-2xl font-semibold mb-2">Digital Avatar</h4>
              <div className="flex items-center justify-center mb-4">
                <CreditCard className="text-primary mr-2" size={20} />
                <span className="text-xl font-bold">$2,500</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Create your own AI avatar that speaks in your voice, reflects your knowledge, and represents your perspectives accurately.
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                <Droplet className="text-cyan-500 mr-2" size={16} />
                <p>100% of proceeds donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">One Water Foundation</a></p>
              </div>
              <Button onClick={openAvatarSheet} className="w-full">Get Started</Button>
            </motion.div>
            
            {/* Professional Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="neo-glass p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserRound size={32} className="text-accent" />
              </div>
              <h4 className="text-2xl font-semibold mb-2">Professional Profile</h4>
              <div className="flex items-center justify-center mb-4">
                <CreditCard className="text-accent mr-2" size={20} />
                <span className="text-xl font-bold">$500</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Elevate your online presence with a professional, interactive profile that showcases your expertise and personal brand.
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                <Droplet className="text-cyan-500 mr-2" size={16} />
                <p>100% of proceeds donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">One Water Foundation</a></p>
              </div>
              <Button onClick={openProfileSheet} className="w-full">Get Started</Button>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-6 rounded-xl border border-gray-200 inline-flex items-center gap-4 mx-auto"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center shrink-0">
                <HeartHandshake size={24} className="text-cyan-500" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold mb-1">Supporting One Water</h4>
                <p className="text-muted-foreground text-sm">
                  100% of proceeds from our services are donated to 
                  <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline ml-1">
                    One Water Foundation
                  </a>, 
                  supporting sustainable water solutions globally.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Avatar Interest Form Sheet */}
      <Sheet open={activeSheet === 'avatar'} onOpenChange={(open) => !open && resetAndCloseForm()}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl flex items-center">
              <Bot className="mr-2 text-primary" />
              Digital Avatar Interest
            </SheetTitle>
            <SheetDescription>
              Complete this form to register your interest in creating a personal AI avatar. Price: $2,500
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
                Your interest has been submitted successfully. We'll be in touch with you soon about creating your digital avatar.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetAndCloseForm}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Profile Interest Form Sheet */}
      <Sheet open={activeSheet === 'profile'} onOpenChange={(open) => !open && resetAndCloseForm()}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl flex items-center">
              <UserRound className="mr-2 text-accent" />
              Professional Profile Interest
            </SheetTitle>
            <SheetDescription>
              Complete this form to register your interest in creating a professional profile. Price: $500
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
                Your interest has been submitted successfully. We'll be in touch with you soon about creating your professional profile.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetAndCloseForm}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default InterestForm;
