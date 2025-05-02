
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, MessageSquare, User, Award, FileSearch } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Navbar } from '@/components/navigation/Navbar';

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <section className="hero-gradient text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              GitFlash - Talent-Marktplatz für die Baubranche
            </h1>
            <p className="text-xl md:text-2xl max-w-[800px]">
              Verbindet qualifizierte Akademiker und Fachkräfte mit Unternehmen durch innovative KI-Interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {!isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="bg-white text-gitflash-primary hover:bg-gray-100">
                    <Link to="/login">Als Talent anmelden</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    <Link to="/login">Als Unternehmen anmelden</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="bg-white text-gitflash-primary hover:bg-gray-100">
                  <Link to="/dashboard">Zum Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Wie GitFlash funktioniert</h2>
            <p className="text-xl text-muted-foreground mt-2">Ein neuer Ansatz für Recruiting in der Baubranche</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gitflash-primary/20 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-gitflash-primary" />
              </div>
              <h3 className="text-xl font-bold">Für Talente</h3>
              <p className="mt-2 text-muted-foreground">Präsentieren Sie Ihre Fähigkeiten durch KI-Interviews und werden Sie von Top-Unternehmen gefunden.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gitflash-accent/20 flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-gitflash-accent" />
              </div>
              <h3 className="text-xl font-bold">Für Unternehmen</h3>
              <p className="mt-2 text-muted-foreground">Erstellen Sie individuelle Interviews und finden Sie die besten Talente für Ihre Projekte.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gitflash-primary/20 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-gitflash-primary" />
              </div>
              <h3 className="text-xl font-bold">KI-Interviews</h3>
              <p className="mt-2 text-muted-foreground">Durchführung von automatisierten Vorstellungsgesprächen mit Transkription und Analyse.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gitflash-accent/20 flex items-center justify-center mb-4">
                <FileSearch className="h-8 w-8 text-gitflash-accent" />
              </div>
              <h3 className="text-xl font-bold">Vertragsabschluss</h3>
              <p className="mt-2 text-muted-foreground">Verwalten Sie Jobangebote und schließen Sie Verträge direkt über die Plattform ab.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Für Talente</h2>
              <p className="text-lg mb-6">
                GitFlash bietet Ihnen eine innovative Plattform, um Ihre Fähigkeiten zu präsentieren und von Unternehmen in der Baubranche gefunden zu werden.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                    <Award className="h-5 w-5 text-gitflash-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">KI-Interview Durchführung</h3>
                    <p className="text-muted-foreground">Führen Sie Vorstellungsgespräche mit einer KI durch und erhalten Sie Feedback zu Ihrer Performance.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                    <Award className="h-5 w-5 text-gitflash-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Professionelles Profil</h3>
                    <p className="text-muted-foreground">Erstellen Sie ein detailliertes Profil mit Lebenslauf und werden Sie von Unternehmen gefunden.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-gitflash-primary/20 flex shrink-0 items-center justify-center">
                    <Award className="h-5 w-5 text-gitflash-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Direkte Jobangebote</h3>
                    <p className="text-muted-foreground">Erhalten Sie maßgeschneiderte Jobangebote und schließen Sie Verträge direkt über die Plattform ab.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">Für Unternehmen</h2>
              <p className="text-lg mb-6">
                GitFlash ermöglicht es Ihnen, die besten Talente für Ihre Bauprojekte zu finden und zu bewerten, ohne zeitaufwendige Vorstellungsgespräche führen zu müssen.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-gitflash-accent/20 flex shrink-0 items-center justify-center">
                    <Award className="h-5 w-5 text-gitflash-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">Interview-Designer</h3>
                    <p className="text-muted-foreground">Erstellen Sie individuelle KI-Interviews für verschiedene Positionen und Anforderungen.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-gitflash-accent/20 flex shrink-0 items-center justify-center">
                    <Award className="h-5 w-5 text-gitflash-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">Talente finden</h3>
                    <p className="text-muted-foreground">Durchsuchen Sie Profile von qualifizierten Fachkräften und filtern Sie nach relevanten Kriterien.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-gitflash-accent/20 flex shrink-0 items-center justify-center">
                    <Award className="h-5 w-5 text-gitflash-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">Vertragsmanagement</h3>
                    <p className="text-muted-foreground">Stellen Sie Jobangebote ein und wickeln Sie Zahlungen sicher über die Plattform ab.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {!isAuthenticated && (
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Registrieren Sie sich jetzt</h2>
              <AuthModal />
            </div>
          </div>
        </section>
      )}
      
      <footer className="bg-gitflash-dark text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xl font-bold flex items-center gap-2 mb-4">
                <span className="bg-white text-gitflash-primary p-1 rounded">GF</span>
                GitFlash
              </div>
              <p className="text-gray-300">
                Der Talent-Marktplatz für die Baubranche und akademische Fachkräfte.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Funktionen</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Rechtliches</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">AGB</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Impressum</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} GitFlash. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
