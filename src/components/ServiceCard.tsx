
import React from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  name: string;
  bgColor?: string;
  children: React.ReactNode;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  name,
  bgColor = "",
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full ${className}`}
    >
      <div className={`flex flex-col items-center ${bgColor} py-8 rounded-t-lg`}>
        <div className="mb-2">{icon}</div>
        <h3 className="text-xl font-serif text-brand-navy">{name}</h3>
      </div>
      <div className="text-center flex-grow flex flex-col justify-center space-y-2 p-6 pt-0">
        {children}
      </div>
    </div>
  );
};

export default ServiceCard;
