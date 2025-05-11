
export interface TalentProfile {
  id: string;
  user_id: string;
  headline: string;
  summary: string;
  skills: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  cv_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceEntry {
  id?: string;
  talent_profile_id: string;
  title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  isNew?: boolean;
}

export interface EducationEntry {
  id?: string;
  talent_profile_id: string;
  institution: string;
  degree: string;
  start_date: string;
  end_date?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  isNew?: boolean;
}
