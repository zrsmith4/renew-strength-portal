import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  username: string;
  role: string;
}

interface AvailabilitySlot {
  id: string;
  therapist_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  // 'is_booked' has been replaced by 'status' in the database
  status: 'available' | 'pending_payment' | 'booked' | 'canceled' | 'no_show'; // Using literal types for clarity
  patient_id: string | null;
  service_type: string;
  // New column added during the database migration
  pending_started_at: string | null; // This column is nullable
  created_at: string;
  updated_at: string;
}

interface SlotFormData {
  start_time: string;
  end_time: string;
  service_type: string;
}

const Availability = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("");
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  const [formData, setFormData] = useState<SlotFormData>({
    start_time: "",
    end_time: "",
    service_type: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const serviceOptions = [
    { value: "in-person-assessment", label: "In-Person Assessment" },
    { value: "telehealth", label: "Telehealth" },
    { value: "dry-needling", label: "Dry Needling" },
    { value: "full-pt-telehealth", label: "Full PT Telehealth" },
  ];

  // Fetch current user profile
  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['current-user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  // Fetch all therapists (for admin users)
  const { data: therapists, isLoading: therapistsLoading } = useQuery({
    queryKey: ['therapists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'therapist')
        .order('username');

      if (error) throw error;
      return data as Profile[];
    },
    enabled: userProfile?.role === 'admin',
  });

  // Set current user profile and initial therapist selection
  useEffect(() => {
    if (userProfile) {
      setCurrentUserProfile(userProfile);
      if (userProfile.role === 'therapist') {
        setSelectedTherapistId(userProfile.id);
      } else if (userProfile.role === 'admin' && therapists && therapists.length > 0) {
        setSelectedTherapistId(therapists[0].id);
      }
    }
  }, [userProfile, therapists]);

  // Fetch availability slots for selected date and therapist
  const { data: availabilitySlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['availability-slots', selectedDate, selectedTherapistId],
    queryFn: async () => {
      if (!selectedDate || !selectedTherapistId) return [];
      
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('therapist_availability')
        .select('*')
        .eq('slot_date', dateString)
        .eq('therapist_id', selectedTherapistId)
        .order('start_time');

      if (error) throw error;
      return data as AvailabilitySlot[];
    },
    enabled: !!selectedDate && !!selectedTherapistId,
  });

  // Add new slot mutation
  const addSlotMutation = useMutation({
    mutationFn: async (slotData: SlotFormData) => {
      if (!selectedDate || !selectedTherapistId) throw new Error('Missing required data');

      const { error } = await supabase
        .from('therapist_availability')
        .insert({
          therapist_id: selectedTherapistId,
          slot_date: format(selectedDate, 'yyyy-MM-dd'),
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          service_type: slotData.service_type,
          is_booked: false,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "New availability slot added successfully.",
      });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    },
    onError: (error) => {
      console.error('Add slot error:', error);
      toast({
        title: "Error",
        description: "Failed to add availability slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update slot mutation
  const updateSlotMutation = useMutation({
    mutationFn: async (slotData: SlotFormData) => {
      if (!editingSlot) throw new Error('No slot selected for editing');

      const { error } = await supabase
        .from('therapist_availability')
        .update({
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          service_type: slotData.service_type,
        })
        .eq('id', editingSlot.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Availability slot updated successfully.",
      });
      setIsDialogOpen(false);
      setEditingSlot(null);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    },
    onError: (error) => {
      console.error('Update slot error:', error);
      toast({
        title: "Error",
        description: "Failed to update availability slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete slot mutation
  const deleteSlotMutation = useMutation({
    mutationFn: async (slotId: string) => {
      const { error } = await supabase
        .from('therapist_availability')
        .delete()
        .eq('id', slotId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Availability slot deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    },
    onError: (error) => {
      console.error('Delete slot error:', error);
      toast({
        title: "Error",
        description: "Failed to delete availability slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      start_time: "",
      end_time: "",
      service_type: "",
    });
  };

  const handleAddSlot = () => {
    setEditingSlot(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditSlot = (slot: AvailabilitySlot) => {
    setEditingSlot(slot);
    setFormData({
      start_time: slot.start_time.slice(0, 5), // Remove timezone part for input
      end_time: slot.end_time.slice(0, 5),
      service_type: slot.service_type,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
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

    if (editingSlot) {
      updateSlotMutation.mutate(formData);
    } else {
      addSlotMutation.mutate(formData);
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return format(date, 'h:mm a');
  };

  const getSelectedTherapistName = () => {
    if (currentUserProfile?.role === 'therapist') {
      return currentUserProfile.username;
    }
    return therapists?.find(t => t.id === selectedTherapistId)?.username || '';
  };

  const getPageTitle = () => {
    if (currentUserProfile?.role === 'therapist') {
      return "Manage Your Availability";
    }
    const therapistName = getSelectedTherapistName();
    return therapistName ? `Managing Availability for ${therapistName}` : "Therapist Availability Management";
  };

  if (profileLoading || (currentUserProfile?.role === 'admin' && therapistsLoading)) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-brand-light py-12 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="container mx-auto max-w-4xl relative z-10 px-4">
          <h1 className="font-serif text-3xl text-brand-green mb-8 text-center">
            {getPageTitle()}
          </h1>
          
          <div className="space-y-6">
            {/* Therapist Selection (Admin only) */}
            {currentUserProfile?.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-brand-navy">Select Therapist</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTherapistId} onValueChange={setSelectedTherapistId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists?.map((therapist) => (
                        <SelectItem key={therapist.id} value={therapist.id}>
                          {therapist.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-brand-navy">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Existing Slots Display */}
            {selectedDate && selectedTherapistId && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium text-brand-navy">
                    Availability for {format(selectedDate, "PPP")}
                  </CardTitle>
                  <Button
                    onClick={handleAddSlot}
                    className="bg-brand-green hover:bg-brand-green/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Slot
                  </Button>
                </CardHeader>
                <CardContent>
                  {slotsLoading ? (
                    <div className="flex justify-center py-4">
                      <p className="text-gray-600">Loading slots...</p>
                    </div>
                  ) : availabilitySlots && availabilitySlots.length > 0 ? (
                    <div className="space-y-3">
                      {availabilitySlots.map((slot) => (
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
                              {slot.is_booked && (
                                <p className="text-sm text-red-600 font-medium">Booked</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditSlot(slot)}
                              disabled={slot.is_booked}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={slot.is_booked}
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
                                    onClick={() => deleteSlotMutation.mutate(slot.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No availability set for this date.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Add/Edit Slot Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={addSlotMutation.isPending || updateSlotMutation.isPending}
                  className="flex-1 bg-brand-green hover:bg-brand-green/90"
                >
                  {addSlotMutation.isPending || updateSlotMutation.isPending
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
      </main>
      <Footer />
    </div>
  );
};

export default Availability;
