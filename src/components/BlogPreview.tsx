
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const BlogPreview: React.FC = () => {
  const featuredPosts = [
    {
      title: "5 Exercises to Strengthen Your Core After Injury",
      excerpt: "Learn these gentle but effective exercises to rebuild your core strength during recovery.",
      date: "May 10, 2025",
      slug: "strengthen-core-after-injury"
    },
    {
      title: "The Connection Between Faith and Healing",
      excerpt: "Exploring how spiritual well-being contributes to physical recovery and overall health.",
      date: "May 5, 2025",
      slug: "faith-and-healing"
    },
    {
      title: "Benefits of Mobile Physical Therapy",
      excerpt: "Why bringing physical therapy to your home creates better outcomes and convenience.",
      date: "April 28, 2025",
      slug: "benefits-mobile-physical-therapy"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="section-title mb-2">Wellness Insights</h2>
            <p className="text-lg text-gray-600">Expert advice and resources for your healing journey.</p>
          </div>
          <Button variant="outline" className="btn-secondary mt-4 md:mt-0" asChild>
            <Link to="/blog">View All Posts</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-brand-green/5 to-brand-blue/5 pb-4">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h3 className="text-xl font-serif font-medium text-brand-navy">{post.title}</h3>
              </CardHeader>
              <CardContent className="py-4 flex-grow">
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-0 pb-6">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-brand-navy font-medium hover:text-brand-green transition-colors flex items-center"
                >
                  Read Article
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
