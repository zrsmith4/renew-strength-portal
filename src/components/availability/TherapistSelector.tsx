
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Profile } from "@/types/availability";

interface TherapistSelectorProps {
  therapists: Profile[] | undefined;
  selectedTherapistId: string;
  onTherapistChange: (therapistId: string) => void;
}

const TherapistSelector: React.FC<TherapistSelectorProps> = ({
  therapists,
  selectedTherapistId,
  onTherapistChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-brand-navy">Select Therapist</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedTherapistId} onValueChange={onTherapistChange}>
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
  );
};

export default TherapistSelector;
