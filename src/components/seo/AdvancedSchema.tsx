import React from 'react';

interface AdvancedSchemaProps {
  type?: 'website' | 'organization' | 'medicalOrganization';
}

const AdvancedSchema: React.FC<AdvancedSchemaProps> = ({ type = 'website' }) => {
  React.useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "@id": "https://renewstrengthandwellness.com/#organization",
      "name": "Renew Strength and Wellness Physical Therapy",
      "alternateName": "Renew Strength and Wellness",
      "url": "https://renewstrengthandwellness.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://renewstrengthandwellness.com/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png",
        "width": 300,
        "height": 300
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.facebook.com/renewstrengthandwellness",
        "https://www.linkedin.com/company/renewstrengthandwellness"
      ],
      "founder": {
        "@type": "Person",
        "name": "Physical Therapist",
        "jobTitle": "Licensed Physical Therapist"
      },
      "medicalSpecialty": "Physical Therapy",
      "serviceType": "Mobile Physical Therapy"
    };

    // Website Schema with SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://renewstrengthandwellness.com/#website",
      "url": "https://renewstrengthandwellness.com",
      "name": "Renew Strength and Wellness Physical Therapy",
      "description": "Mobile physical therapy services in Chicago and surrounding suburbs. Faith-based care delivered to your home.",
      "publisher": {
        "@id": "https://renewstrengthandwellness.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://renewstrengthandwellness.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US"
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Mobile Physical Therapy",
      "description": "Comprehensive mobile physical therapy services including assessments, treatment, and dry needling",
      "provider": {
        "@id": "https://renewstrengthandwellness.com/#organization"
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
        }
      ],
      "serviceType": "Physical Therapy",
      "category": "Healthcare",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Physical Therapy Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile Physical Therapy Assessment",
              "description": "Comprehensive evaluation at your location"
            },
            "price": "150",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dry Needling Therapy",
              "description": "Trigger point therapy for pain relief"
            },
            "price": "85",
            "priceCurrency": "USD"
          }
        ]
      }
    };

    // Remove existing schemas
    const existingSchemas = document.querySelectorAll('script[data-advanced-schema]');
    existingSchemas.forEach(script => script.remove());

    // Add schemas
    const schemas = [organizationSchema, websiteSchema, serviceSchema];
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-advanced-schema', `true-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scriptsToRemove = document.querySelectorAll('script[data-advanced-schema]');
      scriptsToRemove.forEach(script => script.remove());
    };
  }, [type]);

  return null;
};

export default AdvancedSchema;