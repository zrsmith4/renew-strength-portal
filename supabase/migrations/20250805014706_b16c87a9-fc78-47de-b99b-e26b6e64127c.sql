-- Performance optimization indexes for better query performance

-- Index for booking queries (filtering by date, service, email lookups)
CREATE INDEX IF NOT EXISTS idx_bookings_date_service ON bookings(date, service);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Index for message queries (conversation lookups, unread messages, timestamp sorting)
CREATE INDEX IF NOT EXISTS idx_messages_conversation_sent_at ON messages(conversation_id, sent_at);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_unread ON messages(recipient_id, is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_messages_sender_sent_at ON messages(sender_id, sent_at);

-- Index for availability queries (therapist schedule lookups, date/time filtering)
CREATE INDEX IF NOT EXISTS idx_availability_therapist_date ON therapist_availability(therapist_id, slot_date);
CREATE INDEX IF NOT EXISTS idx_availability_status_date ON therapist_availability(status, slot_date) WHERE status = 'available';
CREATE INDEX IF NOT EXISTS idx_availability_patient_status ON therapist_availability(patient_id, status) WHERE patient_id IS NOT NULL;

-- Index for payment queries (patient/therapist lookups, status filtering)
CREATE INDEX IF NOT EXISTS idx_payments_patient_status ON payments(patient_id, status);
CREATE INDEX IF NOT EXISTS idx_payments_therapist_created_at ON payments(therapist_id, created_at);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);

-- Index for conversation queries (participant lookups, timestamp sorting)
CREATE INDEX IF NOT EXISTS idx_conversations_participant_one ON conversations(participant_one_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_conversations_participant_two ON conversations(participant_two_id, updated_at);

-- Index for RLS policy optimization (user role checks)
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id_role ON user_roles(user_id, role);

-- Indexes for form timestamp sorting
CREATE INDEX IF NOT EXISTS idx_consent_forms_submitted_at ON consent_forms(submitted_at);
CREATE INDEX IF NOT EXISTS idx_financial_forms_submitted_at ON financial_policies_forms(submitted_at);
CREATE INDEX IF NOT EXISTS idx_dry_needling_forms_submitted_at ON dry_needling_forms(submitted_at);
CREATE INDEX IF NOT EXISTS idx_public_consent_submitted_at ON public_consent_forms(submitted_at);
CREATE INDEX IF NOT EXISTS idx_public_financial_submitted_at ON public_financial_policy_forms(submitted_at);
CREATE INDEX IF NOT EXISTS idx_public_dry_needling_submitted_at ON public_dry_needling_forms(submitted_at);
CREATE INDEX IF NOT EXISTS idx_pending_testimonials_submitted_at ON pending_testimonials(submitted_at);