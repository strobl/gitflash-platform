
import React from 'react';
import { Button } from '@/components/ui/button';
import { PencilIcon, MapPinIcon } from 'lucide-react';
import { JobDetail } from './types';
import { JobActionsMenu } from './JobActionsMenu';

interface JobHeaderProps {
  job: JobDetail;
  onEdit: () => void;
  onClose: () => void;
  onDuplicate: () => void;
}

export const JobHeader: React.FC<JobHeaderProps> = ({ job, onEdit, onClose, onDuplicate }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-gitflash-primary">{job.title}</h1>
        <div className="flex items-center mt-1 text-gray-500">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 self-end md:self-auto">
        <div className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${job.status === 'Aktiv' ? 'bg-green-100 text-green-800' : ''}
          ${job.status === 'In Prüfung' ? 'bg-yellow-100 text-yellow-800' : ''}
          ${job.status === 'Entwurf' ? 'bg-blue-100 text-blue-800' : ''}
          ${job.status === 'Archiviert' ? 'bg-gray-100 text-gray-800' : ''}
          ${job.status === 'Geschlossen' ? 'bg-red-100 text-red-800' : ''}
        `}>
          {job.status}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={onEdit}
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          <span>Bearbeiten</span>
        </Button>
        
        <JobActionsMenu 
          onEdit={onEdit} 
          onClose={onClose} 
          onDuplicate={onDuplicate} 
        />
      </div>
    </div>
  );
};
