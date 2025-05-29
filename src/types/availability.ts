
export interface Profile {
  id: string;
  username: string;
  role: string;
}

export interface AvailabilitySlot {
  id: string;
  therapist_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  status: 'available' | 'pending_payment' | 'booked' | 'canceled' | 'no_show';
  patient_id: string | null;
  service_type: string;
  pending_started_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SlotFormData {
  start_time: string;
  end_time: string;
  service_type: string;
}

export const serviceOptions = [
  { value: "in-person-assessment", label: "In-Person Assessment" },
  { value: "telehealth", label: "Telehealth" },
  { value: "dry-needling", label: "Dry Needling" },
  { value: "full-pt-telehealth", label: "Full PT Telehealth" },
];
