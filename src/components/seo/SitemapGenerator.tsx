import React, { useEffect } from 'react';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SitemapGenerator: React.FC = () => {
  useEffect(() => {
    // Generate sitemap data
    const sitemapEntries: SitemapEntry[] = [
      {
        url: 'https://renewstrengthandwellness.com/',
        changefreq: 'daily',
        priority: 1.0
      },
      {
        url: 'https://renewstrengthandwellness.com/about',
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        url: 'https://renewstrengthandwellness.com/services',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        url: 'https://renewstrengthandwellness.com/services/dry-needling',
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: 'https://renewstrengthandwellness.com/services/telehealth',
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: 'https://renewstrengthandwellness.com/services/in-person-assessment',
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: 'https://renewstrengthandwellness.com/services/full-pt-telehealth',
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: 'https://renewstrengthandwellness.com/pricing',
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        url: 'https://renewstrengthandwellness.com/contact',
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        url: 'https://renewstrengthandwellness.com/blog',
        changefreq: 'weekly',
        priority: 0.6
      },
      {
        url: 'https://renewstrengthandwellness.com/schedule',
        changefreq: 'daily',
        priority: 0.9
      }
    ];

    // Create XML sitemap content
    const createSitemap = (entries: SitemapEntry[]): string => {
      const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
      const footer = '</urlset>';
      
      const urls = entries.map(entry => {
        const lastmod = entry.lastmod || new Date().toISOString().split('T')[0];
        return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq || 'monthly'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`;
      }).join('\n');
      
      return `${header}\n${urls}\n${footer}`;
    };

    // Store sitemap in sessionStorage for development
    if (typeof window !== 'undefined') {
      const sitemapXML = createSitemap(sitemapEntries);
      sessionStorage.setItem('sitemap', sitemapXML);
      
      // Log sitemap for development
      console.log('Generated sitemap:', sitemapXML);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default SitemapGenerator;