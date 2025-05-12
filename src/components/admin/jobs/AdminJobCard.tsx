
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

interface AdminJobCardProps {
  job: {
    id: string;
    title: string;
    location?: string;
    contract_type?: string;
    created_at: string;
    company_name?: string;
  };
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
}

export function AdminJobCard({ job, onApprove, onReject, onView }: AdminJobCardProps) {
  // Format the date
  const getTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: de });
    } catch (e) {
      return 'Unbekannt';
    }
  };

  // Get job contract type label
  const getJobTypeLabel = (type?: string) => {
    if (!type) return 'N/A';
    
    switch (type) {
      case 'fulltime': return 'Vollzeit';
      case 'parttime': return 'Teilzeit';
      case 'freelance': return 'Freiberuflich';
      case 'temporary': return 'Befristet';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gitflash-primary">{job.title}</h2>
            <p className="text-gray-600 mt-1">
              {job.location || 'Remote'} • {getJobTypeLabel(job.contract_type)}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Eingereicht {getTimeAgo(job.created_at)}
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Von: {job.company_name || 'Unternehmen'}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={onView}
            >
              <Eye size={16} /> Ansehen
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onReject}
            >
              <X size={16} /> Ablehnen
            </Button>
            
            <Button 
              size="sm"
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
              onClick={onApprove}
            >
              <Check size={16} /> Freigeben
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
