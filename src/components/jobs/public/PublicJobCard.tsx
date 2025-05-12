
import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, MapPin, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import type { PublicJob } from '@/hooks/usePublicJobs';
import { Button } from '@/components/ui/button';

interface PublicJobCardProps {
  job: PublicJob;
}

export function PublicJobCard({ job }: PublicJobCardProps) {
  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'fulltime': return 'Vollzeit';
      case 'parttime': return 'Teilzeit';
      case 'freelance': return 'Freiberuflich';
      case 'temporary': return 'Befristet';
      default: return type;
    }
  };

  const getTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: de });
    } catch (e) {
      return 'Unbekannt';
    }
  };

  // Format salary range
  const formatSalary = () => {
    if (!job.hourly_rate_min || !job.hourly_rate_max) return 'Auf Anfrage';
    
    if (job.billing_type === 'Stunden') {
      return `${job.hourly_rate_min}€ - ${job.hourly_rate_max}€ / Stunde`;
    } else if (job.billing_type === 'Monat') {
      return `${job.hourly_rate_min}€ - ${job.hourly_rate_max}€ / Monat`;
    } else {
      return `${job.hourly_rate_min}€ - ${job.hourly_rate_max}€ / Tag`;
    }
  };

  return (
    <Link to={`/jobs/${job.id}`} className="group">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-gitflash-primary transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock size={16} className="mr-1" />
              <span>{getTimeAgo(job.created_at)}</span>
            </div>
          </div>
          <div className="bg-gitflash-primary/10 text-gitflash-primary text-xs font-medium px-2.5 py-1 rounded-full">
            {getJobTypeLabel(job.contract_type)}
          </div>
        </div>

        <div className="space-y-3 mb-5 flex-grow">
          <div className="flex items-start text-gray-600">
            <MapPin size={16} className="mr-2 mt-0.5 shrink-0" />
            <span>{job.location || 'Remote'}</span>
          </div>
          
          <div className="flex items-start text-gray-600">
            <BriefcaseIcon size={16} className="mr-2 mt-0.5 shrink-0" />
            <span>{formatSalary()}</span>
          </div>
          
          {job.description && (
            <p className="text-gray-600 line-clamp-3 text-sm mt-2">
              {job.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            <span>{job.views || 0} Aufrufe</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gitflash-primary hover:text-gitflash-primary/70 font-medium text-sm"
          >
            Details <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
