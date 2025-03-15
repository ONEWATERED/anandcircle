
import React, { useEffect, useRef } from 'react';
import { GraduationCap, Users, Code, Lightbulb, MessageSquare, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const courses = [
  {
    id: 'data-fundamentals',
    title: 'Data Fundamentals',
    description: 'Master the essentials of data analysis, visualization, and interpretation. Learn to transform raw data into actionable insights.',
    icon: <Code className="h-10 w-10 text-blue-500" />,
    difficulty: 'Beginner',
    duration: '4 weeks',
    students: '250+',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'Understand the core concepts of artificial intelligence and machine learning. Build your first AI models with hands-on projects.',
    icon: <Lightbulb className="h-10 w-10 text-purple-500" />,
    difficulty: 'Intermediate',
    duration: '6 weeks',
    students: '180+',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Mastery',
    description: 'Learn advanced techniques to craft effective prompts for large language models. Maximize AI outputs for your specific needs.',
    icon: <MessageSquare className="h-10 w-10 text-emerald-500" />,
    difficulty: 'Advanced',
    duration: '5 weeks',
    students: '120+',
    color: 'from-emerald-500 to-teal-400'
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Create compelling visual narratives with data. Learn to use modern visualization tools to communicate insights effectively.',
    icon: <Code className="h-10 w-10 text-amber-500" />,
    difficulty: 'Intermediate',
    duration: '5 weeks',
    students: '210+',
    color: 'from-amber-500 to-orange-400'
  },
  {
    id: 'llm-development',
    title: 'LLM Development',
    description: 'Develop and fine-tune large language models for specific business applications and use cases.',
    icon: <Lightbulb className="h-10 w-10 text-indigo-500" />,
    difficulty: 'Advanced',
    duration: '8 weeks',
    students: '90+',
    color: 'from-indigo-500 to-violet-400'
  }
];

const CourseShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <section id="courses" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl -z-10"></div>
      
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Learning & Community</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Exclusive Courses on <span className="text-gradient-primary">Circle</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join my Circle community to access premium courses on data science, artificial intelligence, 
            and prompt engineering. Learn skills that will transform your career and future.
          </p>
        </div>
        
        <Tabs defaultValue="courses" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="courses" className="text-base">Featured Courses</TabsTrigger>
            <TabsTrigger value="community" className="text-base">Circle Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-8">
            {/* Auto-scrolling course carousel */}
            <div className="max-w-5xl mx-auto relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {courses.map((course) => (
                    <div key={course.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
                      <Card className="neo-glass border-0 overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                        <div className={`h-2 w-full bg-gradient-to-r ${course.color}`}></div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                              <CardDescription className="mt-2 text-xs">
                                <span className="inline-flex items-center mr-3">
                                  <Users className="mr-1 h-3 w-3" /> {course.students} students
                                </span>
                                <span className="inline-flex items-center">
                                  <GraduationCap className="mr-1 h-3 w-3" /> {course.difficulty}
                                </span>
                              </CardDescription>
                            </div>
                            <div className="rounded-full p-2 bg-muted">{course.icon}</div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{course.description}</p>
                          <div className="mt-4 inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full bg-muted">
                            Duration: {course.duration}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className={`w-full bg-gradient-to-r ${course.color} text-white`}>
                            View Course Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-2 mt-4">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full h-8 w-8"
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full h-8 w-8"
                  onClick={() => emblaApi?.scrollNext()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button size="lg" className="bg-primary">
                Browse All Courses
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="space-y-8">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Join the <span className="text-gradient-primary">Circle Community</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with like-minded professionals, participate in exclusive events, 
                    and engage in meaningful discussions around data science, AI, and prompt engineering.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="mr-3 rounded-full p-1 bg-primary/20">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Network with experts and industry professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 rounded-full p-1 bg-primary/20">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Access exclusive workshops and learning resources</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 rounded-full p-1 bg-primary/20">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Participate in live Q&A sessions and discussions</span>
                    </li>
                  </ul>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                    Join Circle Community
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden border-2 border-white/70 shadow-xl">
                      <img 
                        src="/placeholder.svg" 
                        alt="Circle Community Preview" 
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl -z-10"></div>
                    <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-xl -z-10"></div>
                    
                    <div className="absolute top-4 right-4 glass-card p-2 rounded-full shadow-lg">
                      <div className="flex items-center space-x-2 px-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium">Live Community</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-2xl border border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                <img 
                  src="/placeholder.svg" 
                  alt="Student Testimonial" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="italic text-muted-foreground mb-4">
                  "Hardeep's courses have transformed the way I approach AI projects. The prompt engineering 
                  techniques I learned have increased my productivity tenfold, and the community support is invaluable."
                </p>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">AI Product Manager, Tech Solutions Inc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseShowcase;
