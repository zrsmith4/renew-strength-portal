import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TherapistSelector from "@/components/availability/TherapistSelector";
import DateSelector from "@/components/availability/DateSelector";
import SlotsList from "@/components/availability/SlotsList";
import SlotFormDialog from "@/components/availability/SlotFormDialog";
import { useAvailability } from "@/hooks/useAvailability";
import type { AvailabilitySlot } from "@/types/availability";

const Availability = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);
  
  const {
    selectedDate,
    setSelectedDate,
    selectedTherapistId,
    setSelectedTherapistId,
    currentUserProfile,
    therapists,
    availabilitySlots,
    profileLoading,
    therapistsLoading,
    slotsLoading,
    addSlotMutation,
    updateSlotMutation,
    deleteSlotMutation,
  } = useAvailability();

  const handleAddSlot = () => {
    setEditingSlot(null);
    setIsDialogOpen(true);
  };

  const handleEditSlot = (slot: AvailabilitySlot) => {
    setEditingSlot(slot);
    setIsDialogOpen(true);
  };

  const handleSubmit = (formData: any) => {
    if (editingSlot) {
      updateSlotMutation.mutate(
        { slotId: editingSlot.id, slotData: formData },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingSlot(null);
          }
        }
      );
    } else {
      addSlotMutation.mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
        }
      });
    }
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
              <TherapistSelector
                therapists={therapists}
                selectedTherapistId={selectedTherapistId}
                onTherapistChange={setSelectedTherapistId}
              />
            )}

            {/* Date Selection */}
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            {/* Existing Slots Display */}
            {selectedDate && selectedTherapistId && (
              <SlotsList
                selectedDate={selectedDate}
                availabilitySlots={availabilitySlots}
                isLoading={slotsLoading}
                onAddSlot={handleAddSlot}
                onEditSlot={handleEditSlot}
                onDeleteSlot={(slotId) => deleteSlotMutation.mutate(slotId)}
                isDeleting={deleteSlotMutation.isPending}
              />
            )}
          </div>
        </div>

        {/* Add/Edit Slot Dialog */}
        <SlotFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingSlot={editingSlot}
          onSubmit={handleSubmit}
          isLoading={addSlotMutation.isPending || updateSlotMutation.isPending}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Availability;
