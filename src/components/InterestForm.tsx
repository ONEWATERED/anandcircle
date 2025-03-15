
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
  Check 
} from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  interest: z.enum(["digital-clone", "professional-profile", "both"]),
});

type FormValues = z.infer<typeof formSchema>;

const InterestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "digital-clone",
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to a backend service
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", data);
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

  return (
    <section id="interest-form" className="py-20 md:py-32 bg-gradient-to-br from-gray-100 to-white">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Marketing content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-left mb-8">
                <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">Create Your Own</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Interested in Your Personal Digital Twin?</h3>
                <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
              </div>
              
              <div className="space-y-8">
                <div className="glass-card p-6 rounded-xl border border-gray-200 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Bot size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Digital Clone</h4>
                    <p className="text-muted-foreground">Create your own AI twin that speaks in your voice, reflects your knowledge, and represents your perspectives accurately.</p>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl border border-gray-200 flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <UserRound size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Professional Profile</h4>
                    <p className="text-muted-foreground">Elevate your online presence with a professional, interactive profile that showcases your expertise and personal brand.</p>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-xl border border-gray-200 flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center shrink-0">
                    <HeartHandshake size={24} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Supporting One Water</h4>
                    <p className="text-muted-foreground">
                      All proceeds from our services are donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">One Water Foundation</a>, 
                      supporting sustainable water solutions globally.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm">
                {!isSubmitted ? (
                  <>
                    <h4 className="text-xl font-display font-semibold mb-6 text-center">Express Your Interest</h4>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          name="interest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>I'm interested in:</FormLabel>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                <Button
                                  type="button"
                                  variant={field.value === "digital-clone" ? "default" : "outline"}
                                  className={field.value === "digital-clone" ? "border-primary" : ""}
                                  onClick={() => form.setValue("interest", "digital-clone")}
                                >
                                  Digital Clone
                                </Button>
                                <Button
                                  type="button"
                                  variant={field.value === "professional-profile" ? "default" : "outline"}
                                  className={field.value === "professional-profile" ? "border-primary" : ""}
                                  onClick={() => form.setValue("interest", "professional-profile")}
                                >
                                  Profile Site
                                </Button>
                                <Button
                                  type="button"
                                  variant={field.value === "both" ? "default" : "outline"}
                                  className={field.value === "both" ? "border-primary" : ""}
                                  onClick={() => form.setValue("interest", "both")}
                                >
                                  Both
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Submitting...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Submit Interest <Send size={16} />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h4 className="text-xl font-display font-semibold mb-3">Thank You!</h4>
                    <p className="text-muted-foreground mb-6">
                      Your interest has been submitted successfully. We'll be in touch with you soon to discuss how we can help create your digital experience.
                    </p>
                    <Button
                      variant="outline"
                      className="mx-auto"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterestForm;
