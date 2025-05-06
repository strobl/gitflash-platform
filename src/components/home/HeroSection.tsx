
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function HeroSection() {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="hero-gradient text-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight animate-fade-in">
            GitFlash - Talent-Marktplatz für die Baubranche
          </h1>
          <p className="text-lg md:text-xl max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Verbindet qualifizierte Akademiker und Fachkräfte mit Unternehmen durch innovative KI-Interviews.
            Optimieren Sie Ihren Recruiting-Prozess und finden Sie die passenden Talente für Ihre Projekte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {!isAuthenticated ? (
              <>
                <Button asChild size="lg" className="bg-white text-gitflash-primary hover:bg-gray-100 shadow-lg">
                  <Link to="/login">Als Talent anmelden</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/login">Als Unternehmen anmelden</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg" className="bg-white text-gitflash-primary hover:bg-gray-100 shadow-lg">
                <Link to="/dashboard">Zum Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
