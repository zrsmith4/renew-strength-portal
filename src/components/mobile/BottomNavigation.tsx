import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MessageCircle, Stethoscope, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    {
      icon: Stethoscope,
      label: 'Services',
      path: '/services',
    },
    {
      icon: Calendar,
      label: 'Book',
      path: '/contact',
    },
    {
      icon: MessageCircle,
      label: 'Contact',
      path: '/contact',
    },
    {
      icon: User,
      label: 'About',
      path: '/about',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-h-[44px] justify-center",
                isActive
                  ? "text-brand-green bg-brand-green/10"
                  : "text-gray-600 hover:text-brand-green"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;