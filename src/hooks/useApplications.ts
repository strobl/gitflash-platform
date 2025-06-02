
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface Application {
  id: string;
  job_id: string;
  talent_id: string;
  status: string;
  applicant_name: string;
  applicant_email: string;
  linkedin_profile?: string;
  cover_letter?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
  interview_scheduled_at?: string;
  offer_response_deadline?: string;
  talent_response?: string;
  last_notification_sent?: string;
  job?: {
    id: string;
    title: string;
    location: string;
    user_id: string;
  };
}

interface UseApplicationsParams {
  type: 'talent' | 'business';
  jobId?: string;
}

// Mock data for testing
const mockApplications: Application[] = [
  {
    id: 'app-1',
    job_id: 'job-1',
    talent_id: 'talent-1',
    status: 'reviewing',
    applicant_name: 'Max Mustermann',
    applicant_email: 'max.mustermann@example.com',
    linkedin_profile: 'https://linkedin.com/in/maxmustermann',
    cover_letter: 'Sehr geehrte Damen und Herren, hiermit bewerbe ich mich...',
    created_at: '2025-05-30T09:00:00Z',
    updated_at: '2025-05-30T09:00:00Z',
    job: {
      id: 'job-1',
      title: 'Bauleiter Hochbau',
      location: 'Berlin',
      user_id: 'business-user-1'
    }
  },
  {
    id: 'app-2', 
    job_id: 'job-2',
    talent_id: 'talent-2',
    status: 'new',
    applicant_name: 'Sarah Schmidt',
    applicant_email: 'sarah.schmidt@example.com',
    linkedin_profile: 'https://linkedin.com/in/sarahschmidt',
    cover_letter: 'Ich interessiere mich sehr für die Position...',
    created_at: '2025-05-31T14:30:00Z',
    updated_at: '2025-05-31T14:30:00Z',
    job: {
      id: 'job-2',
      title: 'Jurist Baurecht',
      location: 'München',
      user_id: 'business-user-1'
    }
  },
  {
    id: 'app-3',
    job_id: 'job-3',
    talent_id: 'talent-3', 
    status: 'interview',
    applicant_name: 'Thomas Weber',
    applicant_email: 'thomas.weber@example.com',
    cover_letter: 'Als erfahrener BIM-Koordinator...',
    created_at: '2025-05-29T11:15:00Z',
    updated_at: '2025-05-29T11:15:00Z',
    job: {
      id: 'job-3',
      title: 'BIM-Koordinator',
      location: 'Hamburg',
      user_id: 'business-user-1'
    }
  }
];

export function useApplications({ type, jobId }: UseApplicationsParams) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['applications', type, jobId, user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      console.log('Fetching applications for:', { type, jobId, userId: user.id });

      // For now, return mock data for testing
      let filteredApplications = mockApplications;

      if (type === 'talent') {
        filteredApplications = mockApplications.filter(app => app.talent_id === user.id);
      } else if (type === 'business') {
        // For business users, show all applications for their jobs
        filteredApplications = mockApplications.filter(app => app.job?.user_id === user.id);
        if (jobId) {
          filteredApplications = filteredApplications.filter(app => app.job_id === jobId);
        }
      }

      console.log('Applications fetched successfully:', filteredApplications?.length || 0, 'applications');
      return filteredApplications;
    },
    enabled: !!user?.id,
  });
}
