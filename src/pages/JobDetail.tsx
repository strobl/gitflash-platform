
import React from 'react';
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

export default function JobDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { jobs } = usePublicJobs();
  
  // Find the job by ID
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gitflash-background to-slate-100">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gitflash-primary mb-2">Job nicht gefunden</h2>
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
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/jobs" className="flex items-center text-gitflash-accent hover:text-gitflash-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Zurück zu Jobs
          </Link>
          <span className="text-gitflash-secondary">/</span>
          <span className="text-gitflash-text">Stellendetails</span>
        </div>

        <div className="space-y-8">
          {/* Header Card */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold text-gitflash-primary mb-3">
                    {job.title}
                  </CardTitle>
                  
                  <div className="flex flex-wrap items-center gap-6 text-gitflash-secondary mb-4">
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-gitflash-accent" />
                      <span className="font-medium">GitFlash</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-gitflash-accent" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gitflash-accent" />
                      <span>Veröffentlicht: {formatDate(job.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-gitflash-light text-gitflash-primary px-3 py-1">
                      {job.contract_type === 'fulltime' ? 'Vollzeit' : job.contract_type}
                    </Badge>
                    
                    <div className="flex items-center text-gitflash-primary font-bold text-lg">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span>{formatSalary(job.hourly_rate_min, job.hourly_rate_max)}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-gitflash-primary hover:bg-gitflash-secondary text-white px-8 py-3 text-lg font-semibold">
                  {isAuthenticated ? 'Jetzt bewerben' : 'Anmelden zum Bewerben'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Über die Rolle */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gitflash-primary">Über die Rolle</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="text-gitflash-text leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </CardContent>
          </Card>

          {/* Ihr Profil */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gitflash-primary">Ihr Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text">Erfahrung in der Baubranche von Vorteil</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text">Kommunikationsstärke und Teamgeist</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text">Zuverlässigkeit und Eigeninitiative</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-gitflash-success mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gitflash-text">Flexibilität bei Arbeitszeiten</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Rahmenbedingungen */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gitflash-primary">Rahmenbedingungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-gitflash-accent mr-3" />
                  <div>
                    <span className="font-medium text-gitflash-primary">Vertragsart: </span>
                    <span className="text-gitflash-text">{job.contract_type === 'fulltime' ? 'Vollzeit' : job.contract_type}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gitflash-accent mr-3" />
                  <div>
                    <span className="font-medium text-gitflash-primary">Arbeitsort: </span>
                    <span className="text-gitflash-text">{job.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gitflash-accent mr-3" />
                  <div>
                    <span className="font-medium text-gitflash-primary">Abrechnung: </span>
                    <span className="text-gitflash-text">{job.billing_type}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gitflash-accent mr-3" />
                  <div>
                    <span className="font-medium text-gitflash-primary">Teamgröße: </span>
                    <span className="text-gitflash-text">5-10 Personen</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vergütung & Abwicklung */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gitflash-primary">Vergütung & Abwicklung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gitflash-light rounded-lg">
                  <div className="flex items-center">
                    <Banknote className="w-6 h-6 text-gitflash-success mr-3" />
                    <div>
                      <div className="font-bold text-gitflash-primary text-lg">
                        {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
                      </div>
                      <div className="text-sm text-gitflash-secondary">Stundenlohn</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gitflash-success text-white">
                    Wettbewerbsfähig
                  </Badge>
                </div>
                
                <ul className="space-y-2 text-sm text-gitflash-text">
                  <li>• Pünktliche Auszahlung alle 2 Wochen</li>
                  <li>• Automatische Zeiterfassung über GitFlash</li>
                  <li>• Sichere Abwicklung über unsere Plattform</li>
                  <li>• Transparente Abrechnung ohne versteckte Kosten</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Über GitFlash */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gitflash-primary">Über GitFlash</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gitflash-text leading-relaxed mb-4">
                GitFlash ist die führende Plattform für Bauprofis und verbindet qualifizierte Talente mit Top-Arbeitgebern in der Baubranche. 
                Wir sorgen für transparente, sichere und schnelle Vermittlung von Projekten und Festanstellungen.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gitflash-light rounded-lg">
                  <div className="text-2xl font-bold text-gitflash-primary">1000+</div>
                  <div className="text-sm text-gitflash-secondary">Aktive Talente</div>
                </div>
                
                <div className="text-center p-4 bg-gitflash-light rounded-lg">
                  <div className="text-2xl font-bold text-gitflash-primary">500+</div>
                  <div className="text-sm text-gitflash-secondary">Erfolgreiche Projekte</div>
                </div>
                
                <div className="text-center p-4 bg-gitflash-light rounded-lg">
                  <div className="text-2xl font-bold text-gitflash-primary">4.8</div>
                  <div className="text-sm text-gitflash-secondary flex items-center justify-center">
                    <Star className="w-4 h-4 text-gitflash-warning mr-1" />
                    Bewertung
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call-to-Action für Empfehlungen */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gitflash-accent to-gitflash-warning text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Verdienen Sie 400€ durch Empfehlungen</h3>
              <p className="text-lg mb-6 opacity-90">
                Kennen Sie jemanden, der perfekt für diese Position wäre? Empfehlen Sie uns qualifizierte Kandidaten und erhalten Sie eine Prämie von 400€.
              </p>
              <Button 
                variant="secondary" 
                className="bg-white text-gitflash-primary hover:bg-gitflash-light font-bold px-8 py-3"
              >
                Jetzt empfehlen
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
