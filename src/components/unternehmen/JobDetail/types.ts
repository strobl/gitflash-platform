
export interface JobDetail {
  id: string;
  title: string;
  location: string;
  project: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';
  visibility: 'Öffentlich' | 'Nur intern';
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface Applicant {
  id: string;
  name: string;
  appliedAt: string;
  score: number;
  status: 'Neu' | 'In Bearbeitung' | 'Vorstellungsgespräch' | 'Angebot' | 'Abgelehnt' | 'Eingestellt';
}

export interface JobStats {
  views: number;
  applications: number;
  averageScore: number;
  viewsOverTime: Array<{ date: string; views: number }>;
  applicationsOverTime: Array<{ date: string; applications: number }>;
}
