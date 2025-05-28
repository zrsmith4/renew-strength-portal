
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Profile {
  id: string;
  username: string;
  role: string;
}

interface NewConversationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  patients: Profile[] | undefined;
  selectedPatient: string;
  onPatientSelect: (patientId: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  onCreateConversation: () => void;
  isCreating: boolean;
}

export const NewConversationDialog: React.FC<NewConversationDialogProps> = ({
  isOpen,
  onOpenChange,
  patients,
  selectedPatient,
  onPatientSelect,
  message,
  onMessageChange,
  onCreateConversation,
  isCreating
}) => {
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
            <label className="text-sm font-medium">Select Patient</label>
            <Select value={selectedPatient} onValueChange={onPatientSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Input
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Type your message..."
            />
          </div>
          <Button 
            onClick={onCreateConversation}
            disabled={!selectedPatient || !message.trim() || isCreating}
            className="w-full"
          >
            Start Conversation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
