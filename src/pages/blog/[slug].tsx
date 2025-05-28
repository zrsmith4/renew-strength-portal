import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const displayTitle = slug
    ? slug.replace(/-/g, ' ').split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    : 'Loading...';

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12 md:py-16 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <Link to="/blog" className="text-brand-green hover:underline mb-4 flex items-center">
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-brand-navy mb-4">
            {displayTitle}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Date: [Insert Date] | Category: [Insert Category]
          </p>
          <div className="prose prose-lg text-gray-700 max-w-none">
            <img 
              src="/placeholder.svg"
              alt="Blog post visual"
              className="w-full h-auto rounded-lg mb-8"
            />

            <h3>Introduction to the Topic</h3>
            <p>
              This is where the detailed content of your blog post will go. For your MVP, this is a placeholder. 
              In the future, you'll replace this with the actual article text, potentially fetched from a CMS 
              or a local data source based on the '{slug}' slug.
            </p>
            <p>
              You can include paragraphs, subheadings, lists, and images here to make your blog posts engaging and informative.
            </p>

            <h4>Key Takeaways</h4>
            <ul>
              <li>Point 1: Detail about the first key takeaway.</li>
              <li>Point 2: Detail about the second key takeaway.</li>
              <li>Point 3: Detail about the third key takeaway.</li>
            </ul>

            <p>
              Thank you for reading! We hope this information was helpful for your journey to renewed strength and wellness.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
