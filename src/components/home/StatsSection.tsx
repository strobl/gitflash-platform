
import { 
  Users, 
  Briefcase,
  Handshake,
  Building
} from 'lucide-react';

export function StatsSection() {
  return (
    <section className="py-16 bg-gitflash-primary text-white full-width-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">GitFlash in Zahlen</h2>
          <p className="text-xl mt-2 text-white/90">Wachsende Community von Talenten und Unternehmen</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Users className="h-10 w-10" />
            </div>
            <div className="text-4xl font-bold mb-2">5,000+</div>
            <p className="text-white/90">Registrierte Talente</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Building className="h-10 w-10" />
            </div>
            <div className="text-4xl font-bold mb-2">300+</div>
            <p className="text-white/90">Partnerunternehmen</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Briefcase className="h-10 w-10" />
            </div>
            <div className="text-4xl font-bold mb-2">1,200+</div>
            <p className="text-white/90">Verfügbare Jobs</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Handshake className="h-10 w-10" />
            </div>
            <div className="text-4xl font-bold mb-2">2,500+</div>
            <p className="text-white/90">Erfolgreiche Vermittlungen</p>
          </div>
        </div>
      </div>
    </section>
  );
}
