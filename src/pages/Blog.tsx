
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const Blog = () => {
  const featuredPosts = [
    {
      title: "5 Exercises to Strengthen Your Core After Injury",
      excerpt: "Learn these gentle but effective exercises to rebuild your core strength during recovery.",
      date: "May 10, 2025",
      category: "Recovery Tips",
      image: "/placeholder.svg",
      slug: "strengthen-core-after-injury"
    },
    {
      title: "The Connection Between Faith and Healing",
      excerpt: "Exploring how spiritual well-being contributes to physical recovery and overall health.",
      date: "May 5, 2025",
      category: "Wellness",
      image: "/placeholder.svg",
      slug: "faith-and-healing"
    },
    {
      title: "Benefits of Mobile Physical Therapy",
      excerpt: "Why bringing physical therapy to your home creates better outcomes and convenience.",
      date: "April 28, 2025",
      category: "Services",
      image: "/placeholder.svg",
      slug: "benefits-mobile-physical-therapy"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-light py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-brand-navy">
                Wellness Insights & Updates
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Welcome to our blog where we share monthly physical therapy tips, educational articles, 
                and information about upcoming community workshops to support your healing journey.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">Recent Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-brand-green px-2 py-1 bg-brand-green/10 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
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

            <div className="mt-12 text-center">
              <Button variant="outline" className="btn-secondary" asChild>
                <Link to="/blog/archive">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-r from-brand-blue/10 to-brand-green/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4 text-brand-navy">
                Stay Updated with Monthly Wellness Tips
              </h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter for exclusive content, upcoming workshops, and helpful resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
