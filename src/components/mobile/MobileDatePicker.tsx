import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import MobileDrawer from './MobileDrawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileDatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MobileDatePicker: React.FC<MobileDatePickerProps> = ({
  date,
  onDateChange,
  placeholder = "Select date",
  disabled = false,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
    setIsDrawerOpen(false);
  };

  if (!isMobile) {
    // Fall back to regular calendar for desktop
    return (
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal min-h-[44px]",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsDrawerOpen(true)}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : placeholder}
        </Button>
        {isDrawerOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 bg-white border rounded-lg shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal min-h-[48px] text-base",
          !date && "text-muted-foreground"
        )}
        onClick={() => setIsDrawerOpen(true)}
        disabled={disabled}
      >
        <CalendarIcon className="mr-3 h-5 w-5" />
        {date ? format(date, "PPP") : placeholder}
      </Button>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Select Date"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          className="pointer-events-auto w-full"
          classNames={{
            day: "h-12 w-12 text-base",
            cell: "text-center text-base relative p-0 focus-within:relative focus-within:z-20",
            head_cell: "text-muted-foreground font-normal text-sm w-12",
          }}
        />
        <div className="mt-4 space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDateSelect(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </MobileDrawer>
    </>
  );
};

export default MobileDatePicker;