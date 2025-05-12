
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

interface AdminJobProps {
  job: {
    id: string;
    title: string;
    location: string;
    contract_type: string;
    created_at: string;
    company_name?: string;
  };
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
}

export const AdminJobCard: React.FC<AdminJobProps> = ({ job, onApprove, onReject, onView }) => {
  const timeAgo = formatDistanceToNow(new Date(job.created_at), { 
    addSuffix: true,
    locale: de
  });
  
  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gitflash-primary">{job.title}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {job.location && (
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                {job.location}
              </span>
            )}
            {job.contract_type && (
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                {job.contract_type}
              </span>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <span>Erstellt: {timeAgo}</span>
            {job.company_name && (
              <>
                <span className="mx-2">•</span>
                <span>Unternehmen: {job.company_name}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onView}
            className="flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            Ansehen
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onApprove}
            className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Check className="h-4 w-4" />
            Freigeben
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReject}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Ablehnen
          </Button>
        </div>
      </div>
    </Card>
  );
};
