import React from 'react';

interface PerformanceOptimizationProps {
  children: React.ReactNode;
}

const PerformanceOptimization: React.FC<PerformanceOptimizationProps> = ({ children }) => {
  React.useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero images
      const heroImages = [
        '/lovable-uploads/d846324f-6125-47a2-8907-92b08d0b6437.png',
        '/lovable-uploads/6d5db411-b0da-48d2-a2b8-6de25407dec7.png',
        '/lovable-uploads/8175a5df-98e9-4443-8fe5-e8088297a6d7.png'
      ];

      heroImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload logo
      const logoLink = document.createElement('link');
      logoLink.rel = 'preload';
      logoLink.as = 'image';
      logoLink.href = '/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png';
      document.head.appendChild(logoLink);
    };

    // Add critical CSS inlining for above-the-fold content
    const addCriticalCSS = () => {
      const criticalCSS = `
        .hero-section {
          background: linear-gradient(135deg, hsl(var(--brand-navy)), hsl(var(--brand-blue)));
        }
        .btn-primary {
          background: hsl(var(--brand-green));
          transition: all 0.3s ease;
        }
        .section-title {
          font-family: var(--font-serif);
          color: hsl(var(--brand-navy));
        }
      `;

      const style = document.createElement('style');
      style.innerHTML = criticalCSS;
      document.head.appendChild(style);
    };

    // Optimize loading for better Core Web Vitals
    const optimizeLoading = () => {
      // Add dns-prefetch for external resources
      const dnsPrefetch = ['//fonts.googleapis.com', '//www.google-analytics.com'];
      dnsPrefetch.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // Add preconnect for critical resources
      const preconnect = ['//fonts.gstatic.com'];
      preconnect.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Implement resource hints
    const addResourceHints = () => {
      // Prefetch likely next pages
      const prefetchPages = ['/contact', '/services', '/about'];
      prefetchPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Image optimization with intersection observer
    const setupLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
              }
            }
          });
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Run optimizations
    preloadCriticalResources();
    addCriticalCSS();
    optimizeLoading();
    addResourceHints();
    setupLazyLoading();

    // Add viewport meta for mobile optimization
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(meta);
    }

    // Add theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#1e3a8a'; // brand-navy color
      document.head.appendChild(meta);
    }

  }, []);

  return <>{children}</>;
};

export default PerformanceOptimization;