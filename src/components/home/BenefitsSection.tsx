
import { Award } from 'lucide-react';

export function BenefitsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gitflash-primary">Für Talente</h2>
            <p className="text-lg mb-6 text-gitflash-text">
              GitFlash bietet Ihnen eine innovative Plattform, um Ihre Fähigkeiten zu präsentieren und von Unternehmen in der Baubranche gefunden zu werden.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                  <Award className="h-6 w-6 text-gitflash-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gitflash-primary">KI-Interview Durchführung</h3>
                  <p className="text-gitflash-text">Führen Sie Vorstellungsgespräche mit einer KI durch und erhalten Sie Feedback zu Ihrer Performance.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                  <Award className="h-6 w-6 text-gitflash-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gitflash-primary">Professionelles Profil</h3>
                  <p className="text-gitflash-text">Erstellen Sie ein detailliertes Profil mit Lebenslauf und werden Sie von Unternehmen gefunden.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                  <Award className="h-6 w-6 text-gitflash-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gitflash-primary">Direkte Jobangebote</h3>
                  <p className="text-gitflash-text">Erhalten Sie maßgeschneiderte Jobangebote und schließen Sie Verträge direkt über die Plattform ab.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gitflash-primary">Für Unternehmen</h2>
            <p className="text-lg mb-6 text-gitflash-text">
              GitFlash ermöglicht es Ihnen, die besten Talente für Ihre Bauprojekte zu finden und zu bewerten, ohne zeitaufwendige Vorstellungsgespräche führen zu müssen.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                  <Award className="h-6 w-6 text-gitflash-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gitflash-primary">Interview-Designer</h3>
                  <p className="text-gitflash-text">Erstellen Sie individuelle KI-Interviews für verschiedene Positionen und Anforderungen.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                  <Award className="h-6 w-6 text-gitflash-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gitflash-primary">Talente finden</h3>
                  <p className="text-gitflash-text">Durchsuchen Sie Profile von qualifizierten Fachkräften und filtern Sie nach relevanten Kriterien.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                  <Award className="h-6 w-6 text-gitflash-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gitflash-primary">Vertragsmanagement</h3>
                  <p className="text-gitflash-text">Stellen Sie Jobangebote ein und wickeln Sie Zahlungen sicher über die Plattform ab.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
