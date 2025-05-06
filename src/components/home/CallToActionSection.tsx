
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

export function CallToActionSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {!isAuthenticated ? (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gitflash-primary">Registrieren Sie sich jetzt</h2>
              <p className="text-xl mb-6 text-gitflash-text">
                Werden Sie Teil der GitFlash-Community und entdecken Sie neue Möglichkeiten in der Baubranche.
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gitflash-primary">Entdecken Sie mehr Funktionen</h2>
              <p className="text-xl mb-6 text-gitflash-text">
                Erkunden Sie alle Möglichkeiten, die GitFlash für Sie bereithält.
              </p>
              <Button asChild size="lg" className="bg-gitflash-primary hover:bg-gitflash-secondary">
                <Link to="/dashboard">Zum Dashboard</Link>
              </Button>
            </div>
          )}

          {!isAuthenticated && (
            <AuthModal />
          )}
        </div>
      </div>
    </section>
  );
}
