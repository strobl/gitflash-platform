
export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  project: string;
  status: 'Aktiv' | 'Inaktiv' | 'Wartet auf Zusage';
  lastActive: string;
  hours: number;
  avatar?: string;
}
