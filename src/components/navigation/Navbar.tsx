
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Building, User, Shield, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getRoleRedirectPath } from '@/utils/routingUtils';

export function Navbar() {
  const { user, profile, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get the appropriate dashboard link based on user role
  const dashboardLink = getRoleRedirectPath(profile?.role);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95 border-b'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gitflash-primary flex items-center gap-2">
            <span className="bg-gitflash-primary text-white p-1 rounded">GF</span>
            GitFlash
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
              Startseite
            </Link>
            {isAuthenticated && profile?.role && (
              <>
                <Link to={dashboardLink} className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                  {profile.role === 'user' ? 'Mein Bereich' : 'Dashboard'}
                </Link>
                {profile?.role === 'user' && (
                  <>
                    <Link to="/talent/profil" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                      Mein Profil
                    </Link>
                    <Link to="/talent/interview" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                      Interviews erkunden
                    </Link>
                  </>
                )}
                {profile?.role === 'business' && (
                  <>
                    <Link to="/unternehmen/suche" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                      Talente finden
                    </Link>
                    <Link to="/interviews" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                      Interviews
                    </Link>
                  </>
                )}
                {profile?.role === 'operator' && (
                  <>
                    <Link to="/admin" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                      Admin
                    </Link>
                    <Link to="/interviews" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                      Interviews
                    </Link>
                  </>
                )}
              </>
            )}
            {!isAuthenticated && (
              <Link to="/interviews" className="text-gitflash-text hover:text-gitflash-primary transition-colors link-underline">
                Interviews erkunden
              </Link>
            )}
          </nav>
          
          {/* User Menu or Login Button */}
          <div className="flex items-center">
            {isAuthenticated && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {profile?.role === 'user' ? (
                        <User size={18} />
                      ) : profile?.role === 'operator' ? (
                        <Shield size={18} />
                      ) : (
                        <Building size={18} />
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuLabel>
                    {profile?.name || 'Mein Konto'}
                    {profile?.role === 'operator' && (
                      <span className="ml-2 text-xs bg-gitflash-primary text-white px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={dashboardLink} className="cursor-pointer">
                      {profile?.role === 'user' ? 'Mein Bereich' : 'Dashboard'}
                    </Link>
                  </DropdownMenuItem>
                  {profile?.role === 'user' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/talent/profil" className="cursor-pointer">Profil bearbeiten</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {profile?.role === 'business' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/interviews/create" className="cursor-pointer">Interview erstellen</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {profile?.role === 'operator' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/interviews/create" className="cursor-pointer">Interview erstellen</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild className="hidden sm:flex text-gitflash-primary border-gitflash-primary hover:bg-gitflash-primary hover:text-white">
                  <Link to="/interviews">Interviews erkunden</Link>
                </Button>
                <Button asChild className="bg-gitflash-primary hover:bg-gitflash-secondary text-white">
                  <Link to="/login">Anmelden</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="ml-2 md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 text-gitflash-text hover:text-gitflash-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Startseite
            </Link>

            {isAuthenticated && profile?.role && (
              <>
                <Link 
                  to={dashboardLink} 
                  className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {profile?.role === 'user' ? 'Mein Bereich' : 'Dashboard'}
                </Link>
                {profile?.role === 'user' && (
                  <>
                    <Link 
                      to="/talent/profil" 
                      className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mein Profil
                    </Link>
                    <Link 
                      to="/talent/interview" 
                      className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Interviews erkunden
                    </Link>
                  </>
                )}
                {profile?.role === 'business' && (
                  <>
                    <Link 
                      to="/unternehmen/suche" 
                      className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Talente finden
                    </Link>
                    <Link 
                      to="/interviews" 
                      className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Interviews
                    </Link>
                    <Link 
                      to="/interviews/create" 
                      className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Interview erstellen
                    </Link>
                  </>
                )}
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link 
                  to="/interviews" 
                  className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Interviews erkunden
                </Link>
                <Link 
                  to="/login" 
                  className="block py-2 text-gitflash-text hover:text-gitflash-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Anmelden
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
