
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Bot, UserRound } from 'lucide-react';
import { FormValues, InterestSubmission, HUBSPOT_PAYMENT_LINK } from './FormSchema';
import ServiceCard from './ServiceCard';
import DonationBanner from './DonationBanner';
import InterestFormSheet from './InterestFormSheet';

const InterestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSheet, setActiveSheet] = useState<'none' | 'avatar' | 'profile'>('none');
  const [savedInterests, setSavedInterests] = useState<InterestSubmission[]>([]);
  
  // Load saved interests from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('interestSubmissions');
    if (savedData) {
      setSavedInterests(JSON.parse(savedData));
    }
  }, []);
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate submission delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new interest submission with unique ID
      const newSubmission: InterestSubmission = {
        ...data,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: activeSheet
      };
      
      // Update state with new submission
      const updatedInterests = [...savedInterests, newSubmission];
      setSavedInterests(updatedInterests);
      
      // Save to localStorage
      localStorage.setItem('interestSubmissions', JSON.stringify(updatedInterests));
      
      console.log("Interest submitted:", newSubmission);
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

  // Direct to HubSpot payment
  const redirectToPayment = () => {
    window.open(HUBSPOT_PAYMENT_LINK, '_blank');
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
            <ServiceCard
              title="Digital Avatar"
              price="$3,000"
              description="Create your own AI avatar that speaks in your voice, reflects your knowledge, and represents your perspectives accurately."
              icon={<Bot size={32} className="text-primary" />}
              iconBgClass="bg-primary/10"
              onGetStarted={redirectToPayment}
            />
            
            {/* Professional Profile Card */}
            <ServiceCard
              title="Professional Profile"
              price="$500"
              description="Elevate your online presence with a professional, interactive profile that showcases your expertise and personal brand."
              icon={<UserRound size={32} className="text-accent" />}
              iconBgClass="bg-accent/10"
              onGetStarted={redirectToPayment}
            />
          </div>
          
          <div className="mt-12 text-center">
            <DonationBanner />
          </div>
        </div>
      </div>

      {/* Interest Form Sheets */}
      <InterestFormSheet
        isOpen={activeSheet === 'avatar'}
        type="avatar"
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        onSubmit={onSubmit}
        onClose={resetAndCloseForm}
      />

      <InterestFormSheet
        isOpen={activeSheet === 'profile'}
        type="profile"
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        onSubmit={onSubmit}
        onClose={resetAndCloseForm}
      />
    </section>
  );
};

export default InterestForm;
