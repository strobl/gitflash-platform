
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

  // Mobile: Entire card is clickable
  const MobileCard = () => (
    <Link 
      to={`/jobs/${job.id}`}
      className="block sm:hidden"
    >
      <div className="flex flex-col p-4 bg-white hover:bg-gray-50 transition-colors duration-200 gap-4 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gitflash-background rounded-lg flex-shrink-0">
            <Briefcase className="w-5 h-5 text-gitflash-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gitflash-primary mb-2 line-clamp-2">{job.title}</h3>
            
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-center text-xs text-gitflash-secondary">
                <Building className="w-3 h-3 mr-1" />
                <span>Baubranche</span>
              </div>
              
              <div className="flex items-center text-xs text-gitflash-secondary">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{job.location}</span>
              </div>
              
              <div className="flex items-center text-xs text-gitflash-secondary">
                <span className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs rounded-full">
                  {job.contract_type}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gitflash-text line-clamp-2">{job.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gitflash-primary font-semibold text-sm">
            <DollarSign className="w-3 h-3 mr-1" />
            <span>{formatSalary(job.hourly_rate_min, job.hourly_rate_max)}</span>
          </div>
          <div className="text-xs text-gitflash-secondary">
            {formatDate(job.created_at)}
          </div>
        </div>
      </div>
    </Link>
  );

  // Desktop: Only button is clickable (existing behavior)
  const DesktopCard = () => (
    <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between p-4 lg:p-6 bg-white hover:bg-gray-50 transition-colors duration-200 gap-4 sm:gap-6">
      <div className="flex items-start sm:items-center flex-1 gap-3 lg:gap-4">
        <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gitflash-background rounded-lg flex-shrink-0">
          <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-gitflash-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base lg:text-lg font-semibold text-gitflash-primary mb-2 line-clamp-2">{job.title}</h3>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 mb-3">
            <div className="flex items-center text-xs lg:text-sm text-gitflash-secondary">
              <Building className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
              <span>Baubranche</span>
            </div>
            
            <div className="flex items-center text-xs lg:text-sm text-gitflash-secondary">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
              <span className="truncate">{job.location}</span>
            </div>
            
            <div className="flex items-center text-xs lg:text-sm text-gitflash-secondary">
              <span className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs rounded-full">
                {job.contract_type}
              </span>
            </div>
          </div>
          
          <p className="text-xs lg:text-sm text-gitflash-text line-clamp-2 sm:line-clamp-1">{job.description}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:flex-shrink-0">
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center text-right">
          <div className="flex items-center text-gitflash-primary font-semibold text-sm lg:text-base">
            <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            <span className="break-words">{formatSalary(job.hourly_rate_min, job.hourly_rate_max)}</span>
          </div>
          <div className="text-xs text-gitflash-secondary mt-0 sm:mt-1">
            {formatDate(job.created_at)}
          </div>
        </div>
        
        <Button asChild size="sm" className="bg-gitflash-primary hover:bg-gitflash-secondary w-full sm:w-auto text-sm">
          <Link to={`/jobs/${job.id}`}>Mehr Details</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <MobileCard />
      <DesktopCard />
    </>
  );
}
