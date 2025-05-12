
export interface JobDetail {
  id: string;
  title: string;
  location: string;
  description: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Archiviert' | 'Geschlossen' | 'Abgelehnt';
  contract_type: string;
  billing_type: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  views: number;
  applicants: number;
  hourly_rate_min?: string;
  hourly_rate_max?: string;
  project?: string;
  visibility?: 'Öffentlich' | 'Nur intern';
  createdAt?: string;
  updatedAt?: string;
}

export interface Applicant {
  id: string;
  name: string;
  appliedAt: string;
  score: number;
  status: 'Neu' | 'In Bearbeitung' | 'Vorstellungsgespräch' | 'Angebot' | 'Abgelehnt' | 'Eingestellt';
  profilePic?: string;
}

export interface JobStats {
  views: number;
  applications: number;
  averageScore: number;
  viewsOverTime: {
    date: string;
    views: number;
  }[];
  applicationsOverTime: {
    date: string;
    applications: number;
  }[];
}
