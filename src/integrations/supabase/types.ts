export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          linkedin_profile: string | null
          resume_url: string | null
          status: string
          talent_id: string
          updated_at: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          linkedin_profile?: string | null
          resume_url?: string | null
          status?: string
          talent_id: string
          updated_at?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          linkedin_profile?: string | null
          resume_url?: string | null
          status?: string
          talent_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          conversation_context: string | null
          conversation_id: string | null
          conversation_name: string
          conversation_url: string | null
          created_at: string
          created_by: string
          custom_greeting: string | null
          id: string
          is_public: boolean
          language: string | null
          max_call_duration: number | null
          participant_absent_timeout: number | null
          participant_left_timeout: number | null
          persona_id: string | null
          replica_id: string | null
          status: Database["public"]["Enums"]["conversation_status"]
        }
        Insert: {
          conversation_context?: string | null
          conversation_id?: string | null
          conversation_name: string
          conversation_url?: string | null
          created_at?: string
          created_by: string
          custom_greeting?: string | null
          id?: string
          is_public?: boolean
          language?: string | null
          max_call_duration?: number | null
          participant_absent_timeout?: number | null
          participant_left_timeout?: number | null
          persona_id?: string | null
          replica_id?: string | null
          status?: Database["public"]["Enums"]["conversation_status"]
        }
        Update: {
          conversation_context?: string | null
          conversation_id?: string | null
          conversation_name?: string
          conversation_url?: string | null
          created_at?: string
          created_by?: string
          custom_greeting?: string | null
          id?: string
          is_public?: boolean
          language?: string | null
          max_call_duration?: number | null
          participant_absent_timeout?: number | null
          participant_left_timeout?: number | null
          persona_id?: string | null
          replica_id?: string | null
          status?: Database["public"]["Enums"]["conversation_status"]
        }
        Relationships: []
      }
      education_entries: {
        Row: {
          created_at: string
          degree: string
          description: string | null
          end_date: string | null
          id: string
          institution: string
          start_date: string
          talent_profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          description?: string | null
          end_date?: string | null
          id?: string
          institution: string
          start_date: string
          talent_profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          description?: string | null
          end_date?: string | null
          id?: string
          institution?: string
          start_date?: string
          talent_profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_entries_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_entries: {
        Row: {
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          start_date: string
          talent_profile_id: string
          title: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          start_date: string
          talent_profile_id: string
          title: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          talent_profile_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_entries_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_feedback: {
        Row: {
          comment: string
          created_at: string
          id: string
          interview_id: string
          score: number
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          interview_id: string
          score: number
          session_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          interview_id?: string
          score?: number
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          conversation_id: string | null
          conversation_url: string | null
          created_at: string
          created_by: string
          id: string
          interview_id: string
          participant_name: string | null
          recording_status: string | null
          recording_url: string | null
          status: string
          transcript: string | null
          transcript_status: string | null
        }
        Insert: {
          conversation_id?: string | null
          conversation_url?: string | null
          created_at?: string
          created_by: string
          id?: string
          interview_id: string
          participant_name?: string | null
          recording_status?: string | null
          recording_url?: string | null
          status?: string
          transcript?: string | null
          transcript_status?: string | null
        }
        Update: {
          conversation_id?: string | null
          conversation_url?: string | null
          created_at?: string
          created_by?: string
          id?: string
          interview_id?: string
          participant_name?: string | null
          recording_status?: string | null
          recording_url?: string | null
          status?: string
          transcript?: string | null
          transcript_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_sessions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          applicants: number
          approved_at: string | null
          approved_by: string | null
          automatic_communication: boolean
          automatic_redirect: boolean
          billing_type: string
          company_id: string | null
          contract_type: string
          created_at: string | null
          description: string
          form: string
          hourly_rate_max: string
          hourly_rate_min: string
          id: string
          interview: string
          is_paid: boolean
          is_public: boolean
          location: string
          referral_bonus: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_email: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at: string | null
          user_id: string
          views: number
        }
        Insert: {
          applicants?: number
          approved_at?: string | null
          approved_by?: string | null
          automatic_communication?: boolean
          automatic_redirect?: boolean
          billing_type: string
          company_id?: string | null
          contract_type: string
          created_at?: string | null
          description: string
          form?: string
          hourly_rate_max?: string
          hourly_rate_min?: string
          id?: string
          interview?: string
          is_paid?: boolean
          is_public?: boolean
          location: string
          referral_bonus?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_email?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at?: string | null
          user_id: string
          views?: number
        }
        Update: {
          applicants?: number
          approved_at?: string | null
          approved_by?: string | null
          automatic_communication?: boolean
          automatic_redirect?: boolean
          billing_type?: string
          company_id?: string | null
          contract_type?: string
          created_at?: string | null
          description?: string
          form?: string
          hourly_rate_max?: string
          hourly_rate_min?: string
          id?: string
          interview?: string
          is_paid?: boolean
          is_public?: boolean
          location?: string
          referral_bonus?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_email?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          updated_at?: string | null
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "jobs_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          job_id: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          job_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          job_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          location: string | null
          name: string
          role: string
        }
        Insert: {
          id: string
          location?: string | null
          name: string
          role: string
        }
        Update: {
          id?: string
          location?: string | null
          name?: string
          role?: string
        }
        Relationships: []
      }
      talent_profiles: {
        Row: {
          created_at: string
          cv_url: string | null
          headline: string | null
          id: string
          skills: string | null
          status: string
          summary: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cv_url?: string | null
          headline?: string | null
          id?: string
          skills?: string | null
          status?: string
          summary?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cv_url?: string | null
          headline?: string | null
          id?: string
          skills?: string | null
          status?: string
          summary?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_monthly_revenue: {
        Args: { year: number }
        Returns: {
          month: number
          revenue: number
        }[]
      }
      get_total_revenue: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      increment_job_views: {
        Args: { _id: string }
        Returns: undefined
      }
      set_job_status: {
        Args: {
          _job_id: string
          _status: Database["public"]["Enums"]["job_status"]
        }
        Returns: undefined
      }
      toggle_job_public: {
        Args: { _job_id: string; _public: boolean }
        Returns: undefined
      }
    }
    Enums: {
      conversation_status: "active" | "pending" | "ended" | "failed"
      job_status: "draft" | "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      conversation_status: ["active", "pending", "ended", "failed"],
      job_status: ["draft", "pending", "approved", "rejected"],
    },
  },
} as const
