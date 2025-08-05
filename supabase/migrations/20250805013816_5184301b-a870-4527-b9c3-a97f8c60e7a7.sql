-- Performance optimization for the database - Fixed version
-- Add indexes for common query patterns

-- Index for bookings table - likely queried by date and email
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings (date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings (email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at);

-- Index for messages table - queried by conversation and timestamps
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages (conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON public.messages (sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_unread ON public.messages (recipient_id, is_read) WHERE is_read = false;

-- Index for therapist availability - commonly queried by date and status
CREATE INDEX IF NOT EXISTS idx_availability_date_status ON public.therapist_availability (slot_date, status);
CREATE INDEX IF NOT EXISTS idx_availability_therapist_date ON public.therapist_availability (therapist_id, slot_date);

-- Index for payments - queried by patient and status
CREATE INDEX IF NOT EXISTS idx_payments_patient_id ON public.payments (patient_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments (status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments (created_at DESC);

-- Index for conversations - queried by participants
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON public.conversations (participant_one_id, participant_two_id);

-- Add composite indexes for common RLS policy checks
CREATE INDEX IF NOT EXISTS idx_user_roles_lookup ON public.user_roles (user_id, role);

-- Ensure all timestamp columns have proper indexes for sorting
CREATE INDEX IF NOT EXISTS idx_consent_forms_submitted_at ON public.consent_forms (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_financial_policies_submitted_at ON public.financial_policies_forms (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_dry_needling_submitted_at ON public.dry_needling_forms (submitted_at DESC);

-- Add indexes for public forms that might be queried frequently
CREATE INDEX IF NOT EXISTS idx_public_consent_submitted_at ON public.public_consent_forms (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_public_financial_submitted_at ON public.public_financial_policy_forms (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_public_dry_needling_submitted_at ON public.public_dry_needling_forms (submitted_at DESC);

-- Index for testimonials
CREATE INDEX IF NOT EXISTS idx_pending_testimonials_submitted_at ON public.pending_testimonials (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_pending_testimonials_approved ON public.pending_testimonials (is_approved);