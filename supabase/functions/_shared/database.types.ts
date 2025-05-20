export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          job_id: string
          talent_id: string
          status: string
          cover_letter: string | null
          resume_url: string | null
          custom_q_a: Json | null
          version: number
          last_activity_at: string
          deleted_at: string | null
          deleted_by: string | null
          anonymized_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          talent_id: string
          status: string
          cover_letter?: string | null
          resume_url?: string | null
          custom_q_a?: Json | null
          version?: number
          last_activity_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          anonymized_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          talent_id?: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          custom_q_a?: Json | null
          version?: number
          last_activity_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          anonymized_at?: string | null
          created_at?: string
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
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      application_status_history: {
        Row: {
          id: number
          application_id: string
          old_status: string | null
          new_status: string
          changed_by: string
          notes: string | null
          changed_at: string
        }
        Insert: {
          id?: never  // Auto-generated
          application_id: string
          old_status?: string | null
          new_status: string
          changed_by: string
          notes?: string | null
          changed_at?: string
        }
        Update: {
          id?: never  // Auto-generated
          application_id?: string
          old_status?: string | null
          new_status?: string
          changed_by?: string
          notes?: string | null
          changed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_status_history_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      application_status_enum: {
        Row: {
          value: string
          description: string | null
        }
        Insert: {
          value: string
          description?: string | null
        }
        Update: {
          value?: string
          description?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          id: string
          title: string
          user_id: string
          applicants: number
        }
        Insert: {
          id?: string
          title: string
          user_id: string
          applicants?: number
        }
        Update: {
          id?: string
          title?: string
          user_id?: string
          applicants?: number
        }
        Relationships: []
      }
      talent_profiles: {
        Row: {
          id: string
          user_id: string
        }
        Insert: {
          id?: string
          user_id: string
        }
        Update: {
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_applications: {
        Row: {
          id: string
          job_id: string
          talent_id: string
          status: string
          cover_letter: string | null
          resume_url: string | null
          custom_q_a: Json | null
          version: number
          last_activity_at: string
          deleted_at: string | null
          deleted_by: string | null
          anonymized_at: string | null
          created_at: string
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
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      anonymize_application: {
        Args: {
          p_app_id: string
        }
        Returns: boolean
      }
    }
  }
}
