
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Handshake,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
}

function JobCard({ title, company, location, salary, type, tags }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
      <h3 className="text-xl font-bold text-gitflash-primary mb-2">{title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gitflash-text">
          <Building className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{company}</span>
        </div>
        
        <div className="flex items-center text-gitflash-text">
          <MapPin className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-gitflash-text">
          <DollarSign className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{salary}</span>
        </div>
        
        <div className="flex items-center text-gitflash-text">
          <Briefcase className="mr-2 w-4 h-4 text-gitflash-secondary" />
          <span>{type}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gitflash-background text-gitflash-primary text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Button asChild className="w-full bg-gitflash-primary hover:bg-gitflash-secondary">
        <Link to="/login">Jetzt bewerben</Link>
      </Button>
    </div>
  );
}

export function JobListings() {
  const featuredJobs = [
    {
      title: "Bauleiter (m/w/d)",
      company: "Bau GmbH",
      location: "Berlin, Deutschland",
      salary: "70.000€ - 85.000€ p.a.",
      type: "Vollzeit",
      tags: ["Bauleitung", "Projektmanagement", "5+ Jahre Erfahrung"]
    },
    {
      title: "Bauingenieur (m/w/d)",
      company: "Ingenieure AG",
      location: "München, Deutschland",
      salary: "60.000€ - 75.000€ p.a.",
      type: "Vollzeit",
      tags: ["Statik", "CAD", "3+ Jahre Erfahrung"]
    },
    {
      title: "Architekt (m/w/d)",
      company: "Design Architekten",
      location: "Hamburg, Deutschland",
      salary: "55.000€ - 70.000€ p.a.",
      type: "Vollzeit",
      tags: ["Entwurfsplanung", "BIM", "Revit"]
    }
  ];

  return (
    <section className="py-16 bg-gitflash-background full-width-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gitflash-primary">Aktuelle Stellenangebote</h2>
          <p className="text-xl text-gitflash-text mt-2">Entdecken Sie passende Karrieremöglichkeiten in der Baubranche</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-8 rounded-lg bg-white shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gitflash-primary/20">
                <Handshake className="h-8 w-8 text-gitflash-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gitflash-primary mb-2">Sind Sie ein Unternehmen?</h3>
                <p className="text-gitflash-text mb-4">Veröffentlichen Sie Ihre Stellenangebote und finden Sie qualifizierte Talente.</p>
                <Button asChild className="bg-gitflash-primary hover:bg-gitflash-secondary">
                  <Link to="/login?role=business">Als Unternehmen anmelden</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
