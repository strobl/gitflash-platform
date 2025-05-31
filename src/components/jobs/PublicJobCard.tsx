
import React from 'react';
import { MapPin, DollarSign, Briefcase, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicJob } from '@/hooks/usePublicJobs';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

interface PublicJobCardProps {
  job: PublicJob;
}

export function PublicJobCard({ job }: PublicJobCardProps) {
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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gitflash-primary mb-2 line-clamp-2">{job.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gitflash-text">
          <Building className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>Baubranche</span>
        </div>
        
        <div className="flex items-center text-gitflash-text">
          <MapPin className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center text-gitflash-text">
          <DollarSign className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{formatSalary(job.hourly_rate_min, job.hourly_rate_max)}</span>
        </div>
        
        <div className="flex items-center text-gitflash-text">
          <Briefcase className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{job.contract_type}</span>
        </div>
      </div>

      <p className="text-gitflash-text mb-4 line-clamp-3 text-sm leading-relaxed">
        {job.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs font-medium rounded-full">
          {job.contract_type}
        </span>
        <span className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs font-medium rounded-full">
          {job.location}
        </span>
        <span className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs font-medium rounded-full">
          {formatDate(job.created_at)}
        </span>
      </div>
      
      {isAuthenticated ? (
        <Button asChild className="w-full bg-gitflash-primary hover:bg-gitflash-secondary">
          <Link to={`/jobs/${job.id}/apply`}>Jetzt bewerben</Link>
        </Button>
      ) : (
        <Button asChild className="w-full bg-gitflash-primary hover:bg-gitflash-secondary">
          <Link to="/login">Anmelden</Link>
        </Button>
      )}
    </div>
  );
}
