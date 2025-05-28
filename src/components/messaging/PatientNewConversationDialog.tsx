
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface EligibleTherapist {
  id: string;
  username: string;
  role: string;
}

interface PatientNewConversationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  eligibleTherapists: EligibleTherapist[] | undefined;
  therapistsLoading: boolean;
  selectedTherapist: string;
  onTherapistSelect: (therapistId: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  onCreateConversation: () => void;
  isCreating: boolean;
}

export const PatientNewConversationDialog: React.FC<PatientNewConversationDialogProps> = ({
  isOpen,
  onOpenChange,
  eligibleTherapists,
  therapistsLoading,
  selectedTherapist,
  onTherapistSelect,
  message,
  onMessageChange,
  onCreateConversation,
  isCreating
}) => {
  const canCreateConversation = selectedTherapist && message.trim() && !isCreating;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start New Conversation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select Therapist</label>
            {therapistsLoading ? (
              <div className="p-2 text-sm text-gray-500">Loading therapists...</div>
            ) : eligibleTherapists && eligibleTherapists.length > 0 ? (
              <Select value={selectedTherapist} onValueChange={onTherapistSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a therapist" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleTherapists.map((therapist) => (
                    <SelectItem key={therapist.id} value={therapist.id}>
                      {therapist.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="p-2 text-sm text-gray-500 border rounded">
                No therapists available to message yet. You can only message therapists you have appointments with (past or within the next 48 hours).
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Input
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Type your message..."
              disabled={!eligibleTherapists || eligibleTherapists.length === 0}
            />
          </div>
          <Button 
            onClick={onCreateConversation}
            disabled={!canCreateConversation}
            className="w-full"
          >
            {isCreating ? "Starting..." : "Start Conversation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
