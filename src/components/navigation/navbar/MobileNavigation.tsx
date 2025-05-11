
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export const MobileNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, profile } = useAuth();

  // Determine where to redirect based on user role
  const getDashboardLink = () => {
    if (!profile?.role) return '/';
    
    switch (profile.role) {
      case 'user':
        return '/talent';
      case 'business':
      case 'operator':
        return '/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-t animate-fade-in">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/interviews" 
              className={`block py-2 text-gitflash-text hover:text-gitflash-primary link-underline ${
                location.pathname.includes('/interview') ? 'text-gitflash-primary font-medium' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Interviews
            </Link>
            <Link 
              to="/talent" 
              className={`block py-2 text-gitflash-text hover:text-gitflash-primary link-underline ${
                location.pathname.includes('/talent') ? 'text-gitflash-primary font-medium' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Akademiker
            </Link>
            <Link 
              to="/unternehmen/suche" 
              className={`block py-2 text-gitflash-text hover:text-gitflash-primary link-underline ${
                location.pathname.includes('/unternehmen') ? 'text-gitflash-primary font-medium' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Für Unternehmen
            </Link>
            
            {/* Replace Dashboard link with role-based destination */}
            {isAuthenticated ? (
              <Link 
                to={getDashboardLink()}
                className="block py-2 text-gitflash-text hover:text-gitflash-primary link-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {profile?.role === 'user' ? 'Talentbereich' : 'Dashboard'}
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="block py-2 text-gitflash-text hover:text-gitflash-primary link-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anmelden
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
