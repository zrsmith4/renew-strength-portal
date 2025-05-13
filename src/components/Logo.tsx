
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 100 120" 
        className="h-full" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tree/R emblem with subtle cross */}
        <path 
          d="M50 10 L60 25 L72 45 L65 45 L80 70 L70 70 L85 95 L15 95 L30 70 L20 70 L35 45 L28 45 L40 25 L50 10Z" 
          fill="#8ABE7E" 
          stroke="#2A4A64" 
          strokeWidth="2"
        />
        {/* The R in the tree */}
        <path 
          d="M42 55 Q42 45 50 45 Q58 45 58 52 Q58 58 52 60 L60 75 L52 75 L45 60 L45 75 L40 75 L40 40" 
          fill="#2A4A64" 
        />
        {/* Subtle cross shape formed by negative space */}
        <path 
          d="M48 25 L52 25 L52 40 L48 40 Z" 
          fill="#F5F7FA" 
        />
      </svg>
    </div>
  );
};

export default Logo;
