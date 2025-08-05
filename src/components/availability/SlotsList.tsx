
import React from "react";
import { format } from "date-fns";
import { Clock, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AvailabilitySlot } from "@/types/availability";
import { serviceOptions } from "@/types/availability";
import { formatTime } from "@/lib/timeUtils";

interface SlotsListProps {
  selectedDate: Date;
  availabilitySlots: AvailabilitySlot[] | undefined;
  isLoading: boolean;
  onAddSlot: () => void;
  onEditSlot: (slot: AvailabilitySlot) => void;
  onDeleteSlot: (slotId: string) => void;
  isDeleting: boolean;
}

const SlotsList: React.FC<SlotsListProps> = ({
  selectedDate,
  availabilitySlots,
  isLoading,
  onAddSlot,
  onEditSlot,
  onDeleteSlot,
  isDeleting,
}) => {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'available':
        return { text: 'Available', color: 'text-green-600' };
      case 'pending_payment':
        return { text: 'Pending Payment', color: 'text-yellow-600' };
      case 'booked':
        return { text: 'Booked', color: 'text-red-600' };
      case 'canceled':
        return { text: 'Canceled', color: 'text-gray-600' };
      case 'no_show':
        return { text: 'No Show', color: 'text-red-800' };
      default:
        return { text: status, color: 'text-gray-600' };
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-brand-navy">
          Availability for {format(selectedDate, "PPP")}
        </CardTitle>
        <Button
          onClick={onAddSlot}
          className="bg-brand-green hover:bg-brand-green/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Slot
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <p className="text-gray-600">Loading slots...</p>
          </div>
        ) : availabilitySlots && availabilitySlots.length > 0 ? (
          <div className="space-y-3">
            {availabilitySlots.map((slot) => {
              const statusDisplay = getStatusDisplay(slot.status);
              const canEdit = slot.status === 'available';
              
              return (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-white"
                >
                  <div className="flex items-center gap-4">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">
                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {serviceOptions.find(s => s.value === slot.service_type)?.label}
                      </p>
                      <p className={`text-sm font-medium ${statusDisplay.color}`}>
                        {statusDisplay.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditSlot(slot)}
                      disabled={!canEdit}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!canEdit}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Availability Slot</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this availability slot? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteSlot(slot.id)}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={isDeleting}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No availability set for this date.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SlotsList;
