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
    "description": "Faith-based mobile physical therapy services bringing personalized care to your doorstep in the Chicago area and surrounding suburbs.",
    "url": "https://renewstrengthandwellness.com",
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "info@renewstrengthandwellness.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mobile Service - Chicagoland Area",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60601",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.8781",
      "longitude": "-87.6298"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Chicago",
        "containedInPlace": {
          "@type": "State", 
          "name": "Illinois"
        }
      },
      {
        "@type": "City",
        "name": "Oak Park",
        "containedInPlace": {
          "@type": "State",
          "name": "Illinois"
        }
      },
      {
        "@type": "City",
        "name": "Evanston",
        "containedInPlace": {
          "@type": "State",
          "name": "Illinois"
        }
      },
      {
        "@type": "City",
        "name": "Naperville",
        "containedInPlace": {
          "@type": "State",
          "name": "Illinois"
        }
      },
      {
        "@type": "City",
        "name": "Schaumburg",
        "containedInPlace": {
          "@type": "State",
          "name": "Illinois"
        }
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.8781",
        "longitude": "-87.6298"
      },
      "geoRadius": "80467"
    },
    "priceRange": "$65-$150",
    "openingHours": ["Mo-Fr 08:00-18:00", "Sa 09:00-15:00"],
    "paymentAccepted": ["Insurance", "Medicare", "Tricare", "Cash", "Credit Card"],
    "image": "https://renewstrengthandwellness.com/logo.png",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Physical Therapy Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Physical Therapy Assessment",
            "description": "Comprehensive in-home physical therapy evaluation"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Dry Needling Therapy",
            "description": "Trigger point dry needling for pain relief"
          }
        }
      ]
    },
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
        "name": "Do you accept insurance for mobile physical therapy in Chicago?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept most insurance plans including Medicare and Tricare for our mobile physical therapy services throughout Chicago and surrounding suburbs. We'll verify your benefits before your first visit."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Chicago do you serve for mobile physical therapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide mobile physical therapy services throughout Chicago, Oak Park, Evanston, Naperville, Schaumburg, and the greater Chicago metropolitan area. Our service radius covers up to 50 miles from downtown Chicago."
        }
      },
      {
        "@type": "Question",
        "name": "Is mobile physical therapy as effective as clinic-based therapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, mobile physical therapy can be just as effective as clinic-based therapy. The one-on-one attention in your familiar home environment often leads to better outcomes and improved compliance with treatment plans."
        }
      },
      {
        "@type": "Question",
        "name": "How much does mobile physical therapy cost in Chicago?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our mobile physical therapy services range from $65-$150 per session, depending on the specific treatment and insurance coverage. We accept most insurance plans and provide transparent pricing."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide dry needling services at home in Chicago?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer dry needling therapy as part of our mobile physical therapy services throughout the Chicago area. This includes trigger point dry needling for pain relief and muscle dysfunction."
        }
      },
      {
        "@type": "Question",
        "name": "What equipment do you bring for mobile physical therapy visits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We bring all necessary equipment for comprehensive physical therapy treatment to your Chicago area home, including therapeutic tools, exercise equipment, and assessment materials."
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