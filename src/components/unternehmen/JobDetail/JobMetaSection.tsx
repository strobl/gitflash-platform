
import React from 'react';
import { Calendar, Eye, Users } from 'lucide-react';
import { JobDetail } from './types';

interface JobMetaSectionProps {
  job: JobDetail;
  views: number;
  applicants: number;
}

export const JobMetaSection: React.FC<JobMetaSectionProps> = ({ job, views, applicants }) => {
  // Format date to German locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3">
        <div className="bg-blue-50 p-2 rounded-full">
          <Calendar className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Erstellt am</div>
          <div className="font-medium">{formatDate(job.createdAt)}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3">
        <div className="bg-green-50 p-2 rounded-full">
          <Eye className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Aufrufe</div>
          <div className="font-medium">{views}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3">
        <div className="bg-purple-50 p-2 rounded-full">
          <Users className="h-5 w-5 text-purple-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Bewerber</div>
          <div className="font-medium">{applicants}</div>
        </div>
      </div>
    </div>
  );
};
