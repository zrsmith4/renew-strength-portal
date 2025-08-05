export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          consent: boolean
          created_at: string | null
          data: boolean
          date: string
          email: string
          financial: boolean
          id: string
          name: string
          service: string
        }
        Insert: {
          consent?: boolean
          created_at?: string | null
          data?: boolean
          date: string
          email: string
          financial?: boolean
          id?: string
          name: string
          service: string
        }
        Update: {
          consent?: boolean
          created_at?: string | null
          data?: boolean
          date?: string
          email?: string
          financial?: boolean
          id?: string
          name?: string
          service?: string
        }
        Relationships: []
      }
      consent_forms: {
        Row: {
          agreed: boolean
          id: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          agreed?: boolean
          id?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          agreed?: boolean
          id?: string
          submitted_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          participant_one_id: string
          participant_two_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_one_id: string
          participant_two_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_one_id?: string
          participant_two_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_participant_one_id_fkey"
            columns: ["participant_one_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_participant_two_id_fkey"
            columns: ["participant_two_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dry_needling_forms: {
        Row: {
          agreed: boolean
          fear_of_needles: boolean
          has_blood_borne_illness: boolean
          id: string
          is_pregnant: boolean
          on_immunosuppressant: boolean
          submitted_at: string
          user_id: string
        }
        Insert: {
          agreed?: boolean
          fear_of_needles: boolean
          has_blood_borne_illness: boolean
          id?: string
          is_pregnant: boolean
          on_immunosuppressant: boolean
          submitted_at?: string
          user_id: string
        }
        Update: {
          agreed?: boolean
          fear_of_needles?: boolean
          has_blood_borne_illness?: boolean
          id?: string
          is_pregnant?: boolean
          on_immunosuppressant?: boolean
          submitted_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_policies_forms: {
        Row: {
          agreed: boolean
          id: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          agreed?: boolean
          id?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          agreed?: boolean
          id?: string
          submitted_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          conversation_id: string
          id: string
          is_read: boolean
          message_text: string
          recipient_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          conversation_id: string
          id?: string
          is_read?: boolean
          message_text: string
          recipient_id: string
          sender_id: string
          sent_at?: string
        }
        Update: {
          conversation_id?: string
          id?: string
          is_read?: boolean
          message_text?: string
          recipient_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_sessions: {
        Row: {
          created_at: string
          id: string
          note: string | null
          patient_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          patient_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_sessions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          patient_id: string | null
          payment_method: string
          status: string
          therapist_id: string | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          patient_id?: string | null
          payment_method: string
          status?: string
          therapist_id?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          patient_id?: string | null
          payment_method?: string
          status?: string
          therapist_id?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "therapist_availability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_testimonials: {
        Row: {
          email: string
          id: string
          is_approved: boolean
          name: string
          quote: string
          role: string | null
          submitted_at: string
        }
        Insert: {
          email: string
          id?: string
          is_approved?: boolean
          name: string
          quote: string
          role?: string | null
          submitted_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_approved?: boolean
          name?: string
          quote?: string
          role?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      public_consent_forms: {
        Row: {
          agreed: boolean
          email: string
          id: string
          name: string
          phone: string | null
          submitted_at: string
        }
        Insert: {
          agreed?: boolean
          email: string
          id?: string
          name: string
          phone?: string | null
          submitted_at?: string
        }
        Update: {
          agreed?: boolean
          email?: string
          id?: string
          name?: string
          phone?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      public_dry_needling_forms: {
        Row: {
          agreed: boolean
          email: string
          fear_of_needles: boolean
          has_blood_borne_illness: boolean
          id: string
          is_pregnant: boolean
          name: string
          on_immunosuppressant: boolean
          phone: string | null
          submitted_at: string
        }
        Insert: {
          agreed?: boolean
          email: string
          fear_of_needles: boolean
          has_blood_borne_illness: boolean
          id?: string
          is_pregnant: boolean
          name: string
          on_immunosuppressant: boolean
          phone?: string | null
          submitted_at?: string
        }
        Update: {
          agreed?: boolean
          email?: string
          fear_of_needles?: boolean
          has_blood_borne_illness?: boolean
          id?: string
          is_pregnant?: boolean
          name?: string
          on_immunosuppressant?: boolean
          phone?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      public_financial_policy_forms: {
        Row: {
          agreed: boolean
          email: string
          id: string
          name: string
          phone: string | null
          submitted_at: string
        }
        Insert: {
          agreed?: boolean
          email: string
          id?: string
          name: string
          phone?: string | null
          submitted_at?: string
        }
        Update: {
          agreed?: boolean
          email?: string
          id?: string
          name?: string
          phone?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      therapist_availability: {
        Row: {
          created_at: string
          end_time: string
          id: string
          patient_id: string | null
          pending_started_at: string | null
          service_type: string
          slot_date: string
          start_time: string
          status: string
          therapist_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          patient_id?: string | null
          pending_started_at?: string | null
          service_type: string
          slot_date: string
          start_time: string
          status?: string
          therapist_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          patient_id?: string | null
          pending_started_at?: string | null
          service_type?: string
          slot_date?: string
          start_time?: string
          status?: string
          therapist_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_availability_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_availability_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin", "patient"],
    },
  },
} as const
