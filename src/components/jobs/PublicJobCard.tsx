
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Briefcase, Users, Eye } from 'lucide-react';
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg text-gitflash-primary">{job.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-1" />
            {job.contract_type}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700 line-clamp-3">{job.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {job.applicants} Bewerbungen
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {job.views} Aufrufe
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Veröffentlicht: {formatDate(job.created_at)}
          </span>
          
          {isAuthenticated ? (
            <Button asChild>
              <Link to={`/jobs/${job.id}/apply`}>
                Jetzt bewerben
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">
                Anmelden zum Bewerben
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
