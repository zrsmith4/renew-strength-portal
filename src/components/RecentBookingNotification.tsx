import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const RecentBookingNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(0);

  const recentBookings = [
    { name: "Sarah M.", location: "Chicago", time: "5 minutes ago" },
    { name: "Mike T.", location: "Naperville", time: "12 minutes ago" },
    { name: "Jennifer L.", location: "Wheaton", time: "18 minutes ago" },
  ];

  useEffect(() => {
    // Show notification after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Cycle through bookings every 8 seconds
    const cycleTimer = setInterval(() => {
      setCurrentBooking((prev) => (prev + 1) % recentBookings.length);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  if (!isVisible) return null;

  const booking = recentBookings[currentBooking];

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 transform transition-all duration-500 ease-in-out animate-in slide-in-from-left">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              <span className="font-semibold">{booking.name}</span> from {booking.location}
            </p>
            <p className="text-xs text-gray-500">
              Booked a session • {booking.time}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentBookingNotification;