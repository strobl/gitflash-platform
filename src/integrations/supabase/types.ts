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
      profiles: {
        Row: {
          id: string
          name: string
          role: string
        }
        Insert: {
          id: string
          name: string
          role: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      conversation_status: "active" | "pending" | "ended" | "failed"
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
    },
  },
} as const
