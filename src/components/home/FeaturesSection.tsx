
import { Building, MessageSquare, User, FileSearch } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gitflash-primary">Wie GitFlash funktioniert</h2>
          <p className="text-xl text-gitflash-text mt-2">Ein neuer Ansatz für Recruiting in der Baubranche</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift card-gradient">
            <div className="h-16 w-16 rounded-full bg-gitflash-primary/20 flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-bold text-gitflash-primary">Für Talente</h3>
            <p className="mt-2 text-gitflash-text">Präsentieren Sie Ihre Fähigkeiten durch KI-Interviews und werden Sie von Top-Unternehmen gefunden.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift card-gradient">
            <div className="h-16 w-16 rounded-full bg-gitflash-primary/20 flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-bold text-gitflash-primary">Für Unternehmen</h3>
            <p className="mt-2 text-gitflash-text">Erstellen Sie individuelle Interviews und finden Sie die besten Talente für Ihre Projekte.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift card-gradient">
            <div className="h-16 w-16 rounded-full bg-gitflash-primary/20 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-bold text-gitflash-primary">KI-Interviews</h3>
            <p className="mt-2 text-gitflash-text">Durchführung von automatisierten Vorstellungsgesprächen mit Transkription und Analyse.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift card-gradient">
            <div className="h-16 w-16 rounded-full bg-gitflash-primary/20 flex items-center justify-center mb-4">
              <FileSearch className="h-8 w-8 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-bold text-gitflash-primary">Vertragsabschluss</h3>
            <p className="mt-2 text-gitflash-text">Verwalten Sie Jobangebote und schließen Sie Verträge direkt über die Plattform ab.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
