
import React from "react";
import { DollarSign } from "lucide-react";

interface PricingItem {
  name: string;
  price: string;
  icon: React.ReactNode;
  bgColor?: string;
  sub: string;
}

interface PricingTableProps {
  items: PricingItem[];
  className?: string;
}

const PricingTable: React.FC<PricingTableProps> = ({ items, className = "" }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
    {items.map((item) => (
      <div
        className={`bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full`}
        key={item.name}
      >
        <div className={`flex flex-col items-center ${item.bgColor || ""} py-8 rounded-t-lg`}>
          <div className="mb-2">{item.icon}</div>
          <h3 className="text-xl font-serif text-brand-navy">{item.name}</h3>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow text-center p-6 pt-0">
          <p className="text-gray-600 text-base mb-2">{item.sub}</p>
          <div className="flex items-center gap-2 mt-2">
            <DollarSign className="h-6 w-6 text-brand-green" />
            <span className="text-2xl font-bold text-brand-navy">{item.price}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default PricingTable;
