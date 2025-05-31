
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Briefcase, Users, Eye, Building2, Clock } from 'lucide-react';
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
    <Card className="group relative overflow-hidden bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gitflash-primary via-gitflash-accent to-gitflash-secondary"></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gitflash-primary group-hover:text-gitflash-accent transition-colors line-clamp-2 leading-tight">
              {job.title}
            </CardTitle>
            <div className="flex items-center mt-2 text-sm text-gitflash-secondary">
              <Building2 className="w-4 h-4 mr-1.5 text-gitflash-accent" />
              <span className="font-medium">Baubranche</span>
            </div>
          </div>
          <div className="flex flex-col items-end text-xs text-gitflash-secondary/60">
            <Clock className="w-4 h-4 mb-1" />
            <span>{formatDate(job.created_at)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center text-sm text-gitflash-secondary">
            <MapPin className="w-4 h-4 mr-1.5 text-gitflash-accent" />
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Briefcase className="w-4 h-4 mr-1.5 text-gitflash-accent" />
            <span className="px-2 py-1 bg-gitflash-light rounded-full text-gitflash-primary text-xs font-medium">
              {job.contract_type}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gitflash-text leading-relaxed line-clamp-3 text-sm">
          {job.description}
        </p>
        
        <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-gitflash-background to-slate-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-gitflash-success" />
            <div>
              <div className="text-lg font-bold text-gitflash-primary">
                {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
              </div>
              <div className="text-xs text-gitflash-secondary">Stundensatz</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gitflash-secondary">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1.5 text-gitflash-accent" />
              <span className="font-medium">{job.applicants}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1.5 text-gitflash-accent" />
              <span className="font-medium">{job.views}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <Link 
            to={`/jobs/${job.id}`}
            className="text-gitflash-accent hover:text-gitflash-primary font-medium text-sm transition-colors underline-offset-4 hover:underline"
          >
            Details ansehen
          </Link>
          
          {isAuthenticated ? (
            <Button 
              asChild 
              className="bg-gradient-to-r from-gitflash-primary to-gitflash-secondary hover:from-gitflash-secondary hover:to-gitflash-primary text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link to={`/jobs/${job.id}/apply`}>
                Jetzt bewerben
              </Link>
            </Button>
          ) : (
            <Button 
              asChild
              variant="outline"
              className="border-gitflash-primary text-gitflash-primary hover:bg-gitflash-primary hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <Link to="/login">
                Anmelden
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
