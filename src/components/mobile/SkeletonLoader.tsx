import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'button' | 'avatar';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = "", 
  variant = "card" 
}) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";

  const variantClasses = {
    card: "h-48 w-full",
    text: "h-4 w-3/4",
    button: "h-10 w-24",
    avatar: "h-12 w-12 rounded-full",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

export default SkeletonLoader;