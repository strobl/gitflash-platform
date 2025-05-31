
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
  Eye,
  ArrowLeft,
  Share2,
  Bookmark
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ApplicationModal } from '@/components/jobs/ApplicationModal';

export default function JobDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // Mock job data - in real app, fetch from useJobDetail hook
  const job = {
    id: id,
    title: "Senior Projektmanager Hochbau",
    location: "München, Bayern",
    description: "Wir suchen einen erfahrenen Projektmanager für anspruchsvolle Hochbauprojekte. Sie übernehmen die Verantwortung für komplexe Bauprojekte von der Planung bis zur Übergabe und koordinieren alle beteiligten Gewerke.",
    contract_type: "Vollzeit",
    billing_type: "Festanstellung",
    hourly_rate_min: "65",
    hourly_rate_max: "85",
    created_at: new Date().toISOString(),
    views: 234,
    applicants: 12,
    company: "BauExzellenz GmbH",
    requirements: [
      "Abgeschlossenes Studium im Bauwesen oder vergleichbare Qualifikation",
      "Mindestens 5 Jahre Berufserfahrung im Projektmanagement",
      "Erfahrung mit HOAI und VOB",
      "Sicherer Umgang mit MS Project und CAD-Software",
      "Führungserfahrung und Teamgeist"
    ],
    responsibilities: [
      "Leitung komplexer Hochbauprojekte von A-Z",
      "Koordination aller Projektbeteiligten",
      "Termin-, Kosten- und Qualitätskontrolle",
      "Kommunikation mit Bauherren und Behörden",
      "Führung des Projektteams"
    ],
    benefits: [
      "Attraktives Gehalt + Bonussystem",
      "30 Tage Urlaub",
      "Flexible Arbeitszeiten",
      "Weiterbildungsmöglichkeiten",
      "Firmenfahrzeug"
    ]
  };

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
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/jobs" className="flex items-center text-gitflash-accent hover:text-gitflash-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Zurück zu Jobs
          </Link>
          <span className="text-gitflash-secondary">/</span>
          <span className="text-gitflash-text">Stellendetails</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gitflash-primary mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-gitflash-secondary">
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 mr-2 text-gitflash-accent" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-gitflash-accent" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-gitflash-accent" />
                    <Badge variant="secondary" className="bg-gitflash-light text-gitflash-primary">
                      {job.contract_type}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-gitflash-success" />
                    <span className="font-bold text-gitflash-primary">
                      {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gitflash-secondary">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Veröffentlicht: {formatDate(job.created_at)}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gitflash-primary">Stellenbeschreibung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gitflash-text leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gitflash-primary">Anforderungen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gitflash-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gitflash-text">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gitflash-primary">Aufgaben</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gitflash-success rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gitflash-text">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gitflash-primary">Was wir bieten</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gitflash-warning rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gitflash-text">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-gitflash-primary to-gitflash-secondary text-white sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Jetzt bewerben</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Bewerbungen
                    </span>
                    <span className="font-bold">{job.applicants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Aufrufe
                    </span>
                    <span className="font-bold">{job.views}</span>
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <Button 
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full bg-white text-gitflash-primary hover:bg-gitflash-light transition-colors font-bold"
                  >
                    Jetzt bewerben
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-white text-gitflash-primary hover:bg-gitflash-light transition-colors font-bold">
                    <Link to="/login">
                      Anmelden zum Bewerben
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gitflash-primary">Über das Unternehmen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gitflash-light rounded-lg flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-gitflash-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gitflash-primary">{job.company}</h4>
                    <p className="text-sm text-gitflash-secondary">Bauunternehmen</p>
                  </div>
                </div>
                <p className="text-sm text-gitflash-text">
                  Ein führendes Bauunternehmen mit über 20 Jahren Erfahrung in komplexen Hochbauprojekten.
                </p>
              </CardContent>
            </Card>
          </div>
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
