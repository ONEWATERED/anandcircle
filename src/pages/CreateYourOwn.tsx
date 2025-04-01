
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bot, 
  UserRound, 
  HeartHandshake, 
  Send, 
  Check, 
  CreditCard, 
  Droplet, 
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

// HubSpot payment link
const HUBSPOT_PAYMENT_LINK = "https://app-na2.hubspot.com/payment-links/242071608/preview/215795906/test";

const CreateYourOwn = () => {
  // Direct to HubSpot payment
  const redirectToPayment = () => {
    window.open(HUBSPOT_PAYMENT_LINK, '_blank');
  };

  return (
    <MainLayout>
      <div className="relative w-full">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-tech-dark via-[#0B1121] to-tech-dark">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0EA5E9] rounded-full filter blur-[128px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9333EA] rounded-full filter blur-[128px]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                  Create Your <span className="text-gradient-cyan-purple">Digital Identity</span> for the AI Era
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Premium digital presence solutions with purpose. All proceeds donated to water sustainability projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={redirectToPayment}
                    className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white py-6 px-8 rounded-xl text-lg shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 hover:scale-105"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Get Started Now
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                  <a href="#learn-more">
                    <Button 
                      variant="outline"
                      className="border-[#0EA5E9] text-white bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/30 py-6 px-8 rounded-xl text-lg"
                    >
                      Learn More
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section id="learn-more" className="py-16 md:py-24 bg-tech-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-medium tracking-widest text-[#0EA5E9] uppercase mb-3">Our Offerings</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Premium Digital Services</h3>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] mx-auto rounded-full my-6"></div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Choose from our premium digital identity solutions - elevate your online presence 
                while supporting global water sustainability through the One Water Foundation.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 mb-20">
                {/* Digital Avatar Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl overflow-hidden border border-[#0EA5E9]/40 shadow-neon-cyan"
                >
                  <div className="h-40 bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/20"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full border border-white/20"></div>
                    </div>
                    <Bot size={80} className="text-white opacity-80" />
                  </div>
                  
                  <div className="p-8 bg-black/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-2xl font-bold text-white">Digital Avatar</h4>
                      <div className="flex items-center text-white">
                        <CreditCard className="text-[#0EA5E9] mr-2" size={20} />
                        <span className="text-2xl font-bold">$3,000</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      A complete AI digital twin that speaks in your voice, reflects your knowledge, 
                      and accurately represents your perspectives, accessible 24/7 to your audience.
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {[
                        "Custom AI trained on your expertise",
                        "Voice cloning for authentic interactions",
                        "Multilingual conversation capabilities",
                        "Integration with websites and platforms",
                        "Continuous learning and improvement",
                        "Personalized knowledge base"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-center text-sm text-gray-400 mb-6 bg-[#0EA5E9]/5 border border-[#0EA5E9]/20 rounded-lg p-3">
                      <Droplet className="text-cyan-500 mr-2 flex-shrink-0" size={18} />
                      <p>100% of proceeds donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] font-medium hover:underline">One Water Foundation</a></p>
                    </div>
                    
                    <Button 
                      onClick={redirectToPayment}
                      className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white py-6 rounded-xl shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 text-lg"
                    >
                      <Bot className="mr-2 h-5 w-5" />
                      Get Your Digital Avatar
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
                
                {/* Professional Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="rounded-2xl overflow-hidden border border-[#9333EA]/40 shadow-neon-purple"
                >
                  <div className="h-40 bg-gradient-to-r from-[#9333EA] to-[#DB2777] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/20"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full border border-white/20"></div>
                    </div>
                    <UserRound size={80} className="text-white opacity-80" />
                  </div>
                  
                  <div className="p-8 bg-black/50 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-2xl font-bold text-white">Professional Profile</h4>
                      <div className="flex items-center text-white">
                        <CreditCard className="text-[#9333EA] mr-2" size={20} />
                        <span className="text-2xl font-bold">$500</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">
                      Elevate your online presence with a professional, interactive profile showcasing 
                      your expertise and personal brand with modern web design.
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {[
                        "Custom interactive web profile",
                        "Responsive design across all devices",
                        "Personal brand integration",
                        "Portfolio and work showcase",
                        "Contact and inquiry system",
                        "Custom domain setup"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-[#9333EA] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-center text-sm text-gray-400 mb-6 bg-[#9333EA]/5 border border-[#9333EA]/20 rounded-lg p-3">
                      <Droplet className="text-cyan-500 mr-2 flex-shrink-0" size={18} />
                      <p>100% of proceeds donated to <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer" className="text-[#9333EA] font-medium hover:underline">One Water Foundation</a></p>
                    </div>
                    
                    <Button 
                      onClick={redirectToPayment}
                      className="w-full bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white py-6 rounded-xl shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 text-lg"
                    >
                      <UserRound className="mr-2 h-5 w-5" />
                      Get Your Professional Profile
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              </div>
              
              {/* Supporting One Water Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-cyan-500/30 shadow-neon-cyan p-8 bg-gradient-to-r from-[#0B1121] to-[#0B1121]/80"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 rounded-full flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30">
                      <Droplet className="h-20 w-20 text-cyan-500" />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Supporting <span className="text-cyan-500">One Water Foundation</span>
                    </h4>
                    <p className="text-gray-300 mb-6">
                      100% of proceeds from our digital services are donated to the One Water Foundation, 
                      supporting sustainable water solutions globally. By purchasing our services, you're 
                      directly contributing to clean water initiatives and environmental sustainability efforts.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <a href="https://onewater.foundation" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-cyan-500/50 text-white bg-cyan-500/10 hover:bg-cyan-500/20">
                          Learn More About One Water
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                      <Button onClick={redirectToPayment} className="bg-cyan-500 text-white hover:bg-cyan-600">
                        Support This Cause
                        <HeartHandshake className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-tech-dark to-[#0B1121]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-medium tracking-widest text-[#0EA5E9] uppercase mb-3">Process</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">How It Works</h3>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] mx-auto rounded-full my-6"></div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    title: "Purchase & Consultation",
                    description: "Select your preferred digital service and complete the purchase. We'll schedule a consultation to understand your goals.",
                    icon: CreditCard,
                    color: "#0EA5E9"
                  },
                  {
                    step: 2,
                    title: "Content Collection",
                    description: "We gather your content, knowledge, and voice samples (for avatars) to create your personalized digital identity.",
                    icon: Sparkles,
                    color: "#9333EA"
                  },
                  {
                    step: 3,
                    title: "Launch & Support",
                    description: "Your digital identity goes live! We provide ongoing support and updates to ensure optimal performance.",
                    icon: Send,
                    color: "#DB2777"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-tech-dark flex items-center justify-center border-2 border-white/20 z-10">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}40` }}>
                        <item.icon style={{ color: item.color }} size={32} />
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white text-center mb-3">{item.title}</h4>
                    <p className="text-gray-300 text-center">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Button 
                  onClick={redirectToPayment}
                  className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white py-6 px-8 rounded-xl shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 text-lg hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default CreateYourOwn;
