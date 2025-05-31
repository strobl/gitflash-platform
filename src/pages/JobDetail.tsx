
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Building2, 
  Users, 
  ArrowLeft,
  Star,
  CheckCircle,
  Banknote
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { ApplicationModal } from '@/components/jobs/ApplicationModal';

export default function JobDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { jobs } = usePublicJobs();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // Find the job by ID
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gitflash-background to-slate-100">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-gitflash-primary mb-2">Job nicht gefunden</h2>
            <p className="text-gitflash-secondary">Diese Stellenanzeige existiert nicht oder wurde entfernt.</p>
            <Button asChild className="mt-4">
              <Link to="/jobs">Zurück zu Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatSalary = (min: string, max: string) => {
    if (min === '0' && max === '0') return 'Nach Vereinbarung';
    if (min === max) return `${min}€/Stunde`;
    return `${min}€ - ${max}€/Stunde`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gitflash-background to-slate-100">
      <SharedNavbar />
      
      <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 lg:mb-6 text-sm">
          <Link to="/jobs" className="flex items-center text-gitflash-accent hover:text-gitflash-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Zurück zu Jobs</span>
            <span className="sm:hidden">Zurück</span>
          </Link>
          <span className="text-gitflash-secondary">/</span>
          <span className="text-gitflash-text truncate">Stellendetails</span>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Header Card */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-4 lg:pb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 mb-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-gitflash-primary mb-3 leading-tight">
                    {job.title}
                  </CardTitle>
                  
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-gitflash-secondary mb-4 text-sm lg:text-base">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-gitflash-accent flex-shrink-0" />
                      <span className="font-medium">GitFlash</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-gitflash-accent flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-gitflash-accent flex-shrink-0" />
                      <span className="text-xs lg:text-sm">Veröffentlicht: {formatDate(job.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 lg:mb-0">
                    <Badge variant="secondary" className="bg-gitflash-light text-gitflash-primary px-3 py-1.5 w-fit">
                      {job.contract_type === 'fulltime' ? 'Vollzeit' : job.contract_type}
                    </Badge>
                    
                    <div className="flex items-center text-gitflash-primary font-bold text-lg lg:text-xl">
                      <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 mr-1 flex-shrink-0" />
                      <span className="break-words">{formatSalary(job.hourly_rate_min, job.hourly_rate_max)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowApplicationModal(true)}
                  className="bg-gitflash-primary hover:bg-gitflash-secondary text-white px-6 lg:px-8 py-3 lg:py-3 text-base lg:text-lg font-semibold w-full sm:w-auto"
                >
                  Jetzt bewerben
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Über die Rolle */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gitflash-primary">Über die Rolle</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div 
                className="text-gitflash-text leading-relaxed text-sm lg:text-base"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gitflash-primary">Ihr Profil</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text text-sm lg:text-base">Erfahrung in der Baubranche von Vorteil</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text text-sm lg:text-base">Kommunikationsstärke und Teamgeist</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text text-sm lg:text-base">Zuverlässigkeit und Eigeninitiative</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text text-sm lg:text-base">Flexibilität bei Arbeitszeiten</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gitflash-primary">Rahmenbedingungen</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-accent mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-medium text-gitflash-primary text-sm lg:text-base">Vertragsart: </span>
                    <span className="text-gitflash-text text-sm lg:text-base">{job.contract_type === 'fulltime' ? 'Vollzeit' : job.contract_type}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-accent mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-medium text-gitflash-primary text-sm lg:text-base">Arbeitsort: </span>
                    <span className="text-gitflash-text text-sm lg:text-base truncate">{job.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-accent mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-medium text-gitflash-primary text-sm lg:text-base">Abrechnung: </span>
                    <span className="text-gitflash-text text-sm lg:text-base">{job.billing_type}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-accent mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-medium text-gitflash-primary text-sm lg:text-base">Teamgröße: </span>
                    <span className="text-gitflash-text text-sm lg:text-base">5-10 Personen</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gitflash-primary">Vergütung & Abwicklung</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gitflash-light rounded-lg gap-3">
                  <div className="flex items-center">
                    <Banknote className="w-5 h-5 lg:w-6 lg:h-6 text-gitflash-success mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-gitflash-primary text-base lg:text-lg">
                        {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
                      </div>
                      <div className="text-xs lg:text-sm text-gitflash-secondary">Stundenlohn</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gitflash-success text-white w-fit">
                    Wettbewerbsfähig
                  </Badge>
                </div>
                
                <ul className="space-y-2 text-xs lg:text-sm text-gitflash-text">
                  <li>• Pünktliche Auszahlung alle 2 Wochen</li>
                  <li>• Automatische Zeiterfassung über GitFlash</li>
                  <li>• Sichere Abwicklung über unsere Plattform</li>
                  <li>• Transparente Abrechnung ohne versteckte Kosten</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 lg:pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gitflash-primary">Über GitFlash</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gitflash-text leading-relaxed mb-4 text-sm lg:text-base">
                GitFlash ist die führende Plattform für Bauprofis und verbindet qualifizierte Talente mit Top-Arbeitgebern in der Baubranche. 
                Wir sorgen für transparente, sichere und schnelle Vermittlung von Projekten und Festanstellungen.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 lg:p-4 bg-gitflash-light rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-gitflash-primary">1000+</div>
                  <div className="text-xs lg:text-sm text-gitflash-secondary">Aktive Talente</div>
                </div>
                
                <div className="text-center p-3 lg:p-4 bg-gitflash-light rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-gitflash-primary">500+</div>
                  <div className="text-xs lg:text-sm text-gitflash-secondary">Erfolgreiche Projekte</div>
                </div>
                
                <div className="text-center p-3 lg:p-4 bg-gitflash-light rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-gitflash-primary">4.8</div>
                  <div className="text-xs lg:text-sm text-gitflash-secondary flex items-center justify-center">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-gitflash-warning mr-1" />
                    Bewertung
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-gitflash-accent to-gitflash-warning text-white">
            <CardContent className="p-6 lg:p-8 text-center">
              <h3 className="text-xl lg:text-2xl font-bold mb-4">Verdienen Sie 400€ durch Empfehlungen</h3>
              <p className="text-base lg:text-lg mb-6 opacity-90 leading-relaxed">
                Kennen Sie jemanden, der perfekt für diese Position wäre? Empfehlen Sie uns qualifizierte Kandidaten und erhalten Sie eine Prämie von 400€.
              </p>
              <Button 
                variant="secondary" 
                className="bg-white text-gitflash-primary hover:bg-gitflash-light font-bold px-6 lg:px-8 py-3 w-full sm:w-auto"
              >
                Jetzt empfehlen
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Application Modal */}
      {showApplicationModal && (
        <ApplicationModal 
          job={job} 
          onClose={() => setShowApplicationModal(false)} 
        />
      )}
    </div>
  );
}
