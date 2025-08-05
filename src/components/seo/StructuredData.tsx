import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type?: 'home' | 'service' | 'contact' | 'about';
  serviceName?: string;
  serviceDescription?: string;
  servicePrice?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ 
  type = 'home', 
  serviceName, 
  serviceDescription,
  servicePrice 
}) => {
  const baseBusinessData = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "HealthAndBeautyBusiness", "LocalBusiness"],
    "name": "Renew Strength and Wellness Physical Therapy",
    "description": "Faith-based mobile physical therapy services bringing personalized care to your doorstep in the Chicago area.",
    "url": "https://renewstrengthandwellness.com",
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "info@renewstrengthandwellness.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.8781",
      "longitude": "-87.6298"
    },
    "areaServed": {
      "@type": "State",
      "name": "Illinois"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.8781",
        "longitude": "-87.6298"
      },
      "geoRadius": "50000"
    },
    "priceRange": "$65-$150",
    "openingHours": "Mo-Fr 08:00-18:00",
    "paymentAccepted": ["Insurance", "Medicare", "Tricare", "Cash"],
    "image": "https://renewstrengthandwellness.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/renewstrengthandwellness",
      "https://www.linkedin.com/company/renewstrengthandwellness"
    ]
  };

  const serviceData = serviceName ? {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": serviceName,
    "description": serviceDescription,
    "procedureType": "Physical Therapy",
    "bodyLocation": "Full Body",
    "preparation": "No special preparation required",
    "howPerformed": "Mobile in-home therapy sessions",
    "followup": "Follow-up care as needed",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Renew Strength and Wellness Physical Therapy"
    },
    "offers": servicePrice ? {
      "@type": "Offer",
      "price": servicePrice,
      "priceCurrency": "USD"
    } : undefined
  } : null;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://renewstrengthandwellness.com"
      },
      ...(type === 'service' && serviceName ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://renewstrengthandwellness.com/services"
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": serviceName,
        "item": `https://renewstrengthandwellness.com/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}`
      }] : []),
      ...(type === 'contact' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://renewstrengthandwellness.com/contact"
      }] : []),
      ...(type === 'about' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://renewstrengthandwellness.com/about"
      }] : [])
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you accept insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept most insurance plans including Medicare and Tricare. We'll verify your benefits before your first visit."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide mobile physical therapy services throughout the Chicago metropolitan area and surrounding suburbs."
        }
      },
      {
        "@type": "Question",
        "name": "Is mobile physical therapy as effective as clinic-based therapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, mobile physical therapy can be just as effective as clinic-based therapy. The one-on-one attention and familiar environment often lead to better outcomes."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseBusinessData)}
      </script>
      {serviceData && (
        <script type="application/ld+json">
          {JSON.stringify(serviceData)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      {type === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      )}
    </Helmet>
  );
};

export default StructuredData;