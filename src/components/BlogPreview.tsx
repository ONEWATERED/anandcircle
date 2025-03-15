
import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const blogs = [
  {
    title: "Wellness Through Understanding: An Engineer's Approach to Health",
    excerpt: "How applying systems thinking to personal health led to unexpected breakthroughs in my wellness journey.",
    category: "Health",
    date: "June 12, 2023",
    accentColor: "bg-blue-500"
  },
  {
    title: "Mentoring the Next Generation of Public Service Leaders",
    excerpt: "Lessons from my journey from immigrant to executive, and how I'm paying it forward to emerging professionals.",
    category: "Mentoring",
    date: "April 28, 2023",
    accentColor: "bg-purple-500"
  },
  {
    title: "How We Implemented AI Solutions in Public Works",
    excerpt: "A case study in bringing cutting-edge technology to government operations with tangible impact.",
    category: "Technology",
    date: "May 15, 2023",
    accentColor: "bg-emerald-500"
  },
  {
    title: "The Future of Water Management in Urban Settings",
    excerpt: "Exploring innovative approaches to water conservation and management in growing metropolitan areas.",
    category: "One Water",
    date: "July 3, 2023",
    accentColor: "bg-cyan-500"
  },
  {
    title: "Strengthening Family Bonds Through Shared Values",
    excerpt: "How traditional values combined with modern approaches create resilient family structures.",
    category: "Family",
    date: "August 18, 2023",
    accentColor: "bg-rose-500"
  }
];

const BlogPreview = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteract: true })]
  );

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
            <ArrowRight className="mr-2 h-4 w-4" />
            <span>Featured Insights</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Latest <span className="text-gradient-primary">Articles</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Explore my thoughts on technology, wellness, leadership, and more in these featured articles.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {blogs.map((blog, index) => (
                <div key={blog.title} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
                  <article className="glass-card overflow-hidden h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${blog.accentColor} text-white`}>
                          {blog.category}
                        </div>
                        <time className="text-sm text-muted-foreground block mb-4">{blog.date}</time>
                        <h3 className="text-xl font-display font-semibold mb-4">{blog.title}</h3>
                        <p className="text-muted-foreground mb-6">
                          {blog.excerpt}
                        </p>
                      </div>
                      
                      <a 
                        href="#" 
                        className="group inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                      >
                        Read full article
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </article>
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
        
        <div className="mt-12 text-center opacity-0 animate-fade-up" style={{ animationDelay: '500ms' }}>
          <a 
            href="#" 
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide transition duration-200 rounded-full glass hover:bg-white/80"
          >
            View All Articles
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
