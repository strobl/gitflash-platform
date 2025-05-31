
import { ApplicationsTable } from './ApplicationsTable';

interface ApplicationsListProps {
  type: 'talent' | 'business';
  jobId?: string;
}

export function ApplicationsList({ type, jobId }: ApplicationsListProps) {
  return <ApplicationsTable type={type} jobId={jobId} />;
}
