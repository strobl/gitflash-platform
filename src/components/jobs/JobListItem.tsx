
import React from 'react';
import { MapPin, DollarSign, Briefcase, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicJob } from '@/hooks/usePublicJobs';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

interface JobListItemProps {
  job: PublicJob;
}

export function JobListItem({ job }: JobListItemProps) {
  const { isAuthenticated } = useAuth();

  const formatSalary = (min: string, max: string) => {
    if (min === '0' && max === '0') return 'Nach Vereinbarung';
    if (min === max) return `${min}€/Stunde`;
    return `${min}€ - ${max}€/Stunde`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center flex-1">
        <div className="flex items-center justify-center w-12 h-12 bg-gitflash-background rounded-lg mr-4 flex-shrink-0">
          <Briefcase className="w-6 h-6 text-gitflash-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gitflash-primary mb-1 truncate">{job.title}</h3>
          
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="flex items-center text-sm text-gitflash-secondary">
              <Building className="w-4 h-4 mr-1" />
              <span>Baubranche</span>
            </div>
            
            <div className="flex items-center text-sm text-gitflash-secondary">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gitflash-secondary">
              <span className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs rounded-full">
                {job.contract_type}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gitflash-text line-clamp-1">{job.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-6 flex-shrink-0">
        <div className="text-right">
          <div className="flex items-center text-gitflash-primary font-semibold">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{formatSalary(job.hourly_rate_min, job.hourly_rate_max)}</span>
          </div>
          <div className="text-xs text-gitflash-secondary mt-1">
            {formatDate(job.created_at)}
          </div>
        </div>
        
        {isAuthenticated ? (
          <Button asChild size="sm" className="bg-gitflash-primary hover:bg-gitflash-secondary">
            <Link to={`/jobs/${job.id}/apply`}>Bewerben</Link>
          </Button>
        ) : (
          <Button asChild size="sm" className="bg-gitflash-primary hover:bg-gitflash-secondary">
            <Link to="/login">Anmelden</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
