
// Custom types for our applications feature since they're not in the auto-generated types yet
export interface ApplicationRow {
  id: string;
  job_id: string;
  talent_id: string;
  status: string;
  cover_letter: string | null;
  resume_url: string | null;
  custom_q_a: Record<string, any> | null;
  version: number;
  last_activity_at: string;
  deleted_at: string | null;
  deleted_by: string | null;
  anonymized_at: string | null;
  created_at: string;
}

export interface ApplicationInsert {
  id?: string;
  job_id: string;
  talent_id: string;
  status: string;
  cover_letter?: string | null;
  resume_url?: string | null;
  custom_q_a?: Record<string, any> | null;
  version?: number;
  last_activity_at?: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  anonymized_at?: string | null;
  created_at?: string;
}

export interface ApplicationUpdate {
  id?: string;
  job_id?: string;
  talent_id?: string;
  status?: string;
  cover_letter?: string | null;
  resume_url?: string | null;
  custom_q_a?: Record<string, any> | null;
  version?: number;
  last_activity_at?: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  anonymized_at?: string | null;
  created_at?: string;
}

export interface ApplicationHistoryRow {
  id: number;
  application_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  changed_at: string;
}

export interface JobRow {
  id: string;
  title: string;
  location?: string;
  user_id: string;
  applicants: number;
}

export interface ProfileRow {
  id: string;
  name: string;
  role: string;
}
