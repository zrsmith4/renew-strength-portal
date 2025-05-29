
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { AvailabilitySlot, SlotFormData } from "@/types/availability";
import { serviceOptions } from "@/types/availability";

interface SlotFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingSlot: AvailabilitySlot | null;
  onSubmit: (data: SlotFormData) => void;
  isLoading: boolean;
}

const SlotFormDialog: React.FC<SlotFormDialogProps> = ({
  isOpen,
  onOpenChange,
  editingSlot,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<SlotFormData>({
    start_time: "",
    end_time: "",
    service_type: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (editingSlot) {
      setFormData({
        start_time: editingSlot.start_time.slice(0, 5),
        end_time: editingSlot.end_time.slice(0, 5),
        service_type: editingSlot.service_type,
      });
    } else {
      setFormData({
        start_time: "",
        end_time: "",
        service_type: "",
      });
    }
  }, [editingSlot, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.start_time || !formData.end_time || !formData.service_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.start_time >= formData.end_time) {
      toast({
        title: "Validation Error",
        description: "End time must be after start time.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingSlot ? 'Edit Availability Slot' : 'Add New Availability Slot'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start_time">Start Time</Label>
            <Input
              id="start_time"
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end_time">End Time</Label>
            <Input
              id="end_time"
              type="time"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type</Label>
            <Select value={formData.service_type} onValueChange={(value) => setFormData({ ...formData, service_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-brand-green hover:bg-brand-green/90"
            >
              {isLoading
                ? 'Saving...'
                : editingSlot
                ? 'Update Slot'
                : 'Add Slot'
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SlotFormDialog;
