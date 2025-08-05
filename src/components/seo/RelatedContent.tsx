import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Stethoscope, Calendar } from 'lucide-react';

interface RelatedContentItem {
  title: string;
  description: string;
  link: string;
  type: 'service' | 'location' | 'info';
  icon?: React.ReactNode;
}

interface RelatedContentProps {
  currentPage: string;
  className?: string;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ currentPage, className = '' }) => {
  const getRelatedContent = (): RelatedContentItem[] => {
    const allContent: Record<string, RelatedContentItem[]> = {
      'services': [
        {
          title: 'Chicago Suburbs Coverage',
          description: 'See all the Chicago area locations we serve',
          link: '/locations/chicago-suburbs',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Oak Park Services',
          description: 'Specialized care for Oak Park residents',
          link: '/locations/oak-park',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Schedule Assessment',
          description: 'Book your comprehensive evaluation today',
          link: '/contact',
          type: 'info',
          icon: <Calendar className="w-5 h-5 text-brand-green" />
        }
      ],
      'dry-needling': [
        {
          title: 'Mobile PT Assessment',
          description: 'Comprehensive evaluation before treatment',
          link: '/services/in-person',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Chicago Area Service',
          description: 'Dry needling throughout Chicago suburbs',
          link: '/locations/chicago-suburbs',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Telehealth Consultation',
          description: 'Virtual consultation for treatment planning',
          link: '/services/telehealth',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        }
      ],
      'in-person': [
        {
          title: 'Dry Needling Add-on',
          description: 'Enhance your treatment with dry needling',
          link: '/services/dry-needling',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Follow-up Telehealth',
          description: 'Continue care with virtual sessions',
          link: '/services/pt-telehealth',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Service Areas',
          description: 'We serve throughout Chicago suburbs',
          link: '/locations/chicago-suburbs',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        }
      ],
      'telehealth': [
        {
          title: 'In-Person Assessment',
          description: 'Comprehensive hands-on evaluation',
          link: '/services/in-person',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Full PT Telehealth',
          description: 'Complete virtual therapy sessions',
          link: '/services/pt-telehealth',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Schedule Consultation',
          description: 'Book your virtual assessment',
          link: '/contact',
          type: 'info',
          icon: <Calendar className="w-5 h-5 text-brand-green" />
        }
      ],
      'pt-telehealth': [
        {
          title: 'Initial Assessment',
          description: 'Start with a comprehensive evaluation',
          link: '/services/in-person',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Virtual Assessment',
          description: 'Quick virtual evaluation option',
          link: '/services/telehealth',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Service Areas',
          description: 'Available throughout Chicago area',
          link: '/locations/chicago-suburbs',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        }
      ],
      'chicago-suburbs': [
        {
          title: 'Oak Park Services',
          description: 'Dedicated page for Oak Park residents',
          link: '/locations/oak-park',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Mobile Assessment',
          description: 'In-home comprehensive evaluation',
          link: '/services/in-person',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Dry Needling',
          description: 'Professional trigger point therapy',
          link: '/services/dry-needling',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        }
      ],
      'oak-park': [
        {
          title: 'All Chicago Suburbs',
          description: 'See all areas we serve in Chicago',
          link: '/locations/chicago-suburbs',
          type: 'location',
          icon: <MapPin className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Mobile Assessment',
          description: 'In-home evaluation in Oak Park',
          link: '/services/in-person',
          type: 'service',
          icon: <Stethoscope className="w-5 h-5 text-brand-green" />
        },
        {
          title: 'Schedule Visit',
          description: 'Book your Oak Park appointment',
          link: '/contact',
          type: 'info',
          icon: <Calendar className="w-5 h-5 text-brand-green" />
        }
      ]
    };

    return allContent[currentPage] || [];
  };

  const relatedItems = getRelatedContent();

  if (relatedItems.length === 0) return null;

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-center mb-8 text-brand-navy">
          Related Services & Information
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {relatedItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3 mb-2">
                  {item.icon}
                  <CardTitle className="text-lg text-brand-navy group-hover:text-brand-green transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link 
                  to={item.link}
                  className="inline-flex items-center text-brand-green hover:text-brand-navy transition-colors font-medium"
                >
                  Learn More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedContent;