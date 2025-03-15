
import React from 'react';
import { ArrowRight } from 'lucide-react';

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
  }
];

const BlogPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">Featured Insights</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Latest Articles</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article 
              key={blog.title} 
              className="glass-card overflow-hidden opacity-0 animate-fade-up" 
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="p-6">
                <div>
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
                  className="group inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Read full article
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
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
