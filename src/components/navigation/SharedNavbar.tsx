import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SharedNavbar() {
  const { user, profile, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getInitials = () => {
    if (!profile?.name) return 'U';
    return profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash//LogoGF.svg" 
              alt="GitFlash Logo" 
              className="h-8" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/interviewsdesign" 
              className={`text-gitflash-text hover:text-gitflash-primary transition-colors link-underline ${
                location.pathname.includes('/interview') ? 'text-gitflash-primary font-medium' : ''
              }`}
            >
              Interviews
            </Link>
            <Link 
              to="/talents" 
              className={`text-gitflash-text hover:text-gitflash-primary transition-colors link-underline ${
                location.pathname.includes('/talent') ? 'text-gitflash-primary font-medium' : ''
              }`}
            >
              Akademiker
            </Link>
            <Link 
              to="/businesses" 
              className={`text-gitflash-text hover:text-gitflash-primary transition-colors link-underline ${
                location.pathname.includes('/business') ? 'text-gitflash-primary font-medium' : ''
              }`}
            >
              Unternehmen
            </Link>
          </nav>
          
          {/* User Menu or Login Button */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Button asChild variant="outline" className="hidden sm:flex text-gitflash-primary border-gitflash-primary hover:bg-gitflash-primary hover:text-white">
                  <Link to="/interviews/explore">Meine Interviews</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gitflash-primary text-white">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
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
                      <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    {profile?.role === 'user' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="cursor-pointer">Profil bearbeiten</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/interviews/explore" className="cursor-pointer">Interviews erkunden</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {(profile?.role === 'business' || profile?.role === 'operator') && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/interviews" className="cursor-pointer">Interviews verwalten</Link>
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
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild className="hidden sm:flex text-gitflash-primary border-gitflash-primary hover:bg-gitflash-primary hover:text-white">
                  <Link to="/interviews/explore">Finde Experten</Link>
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

      {/* Horizontal Line */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/interviewsdesign" 
              className={`block py-2 text-gitflash-text hover:text-gitflash-primary link-underline ${
                location.pathname.includes('/interview') ? 'text-gitflash-primary font-medium' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Interviews
            </Link>
            <Link 
              to="/talents" 
              className={`block py-2 text-gitflash-text hover:text-gitflash-primary link-underline ${
                location.pathname.includes('/talent') ? 'text-gitflash-primary font-medium' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Akademiker
            </Link>
            <Link 
              to="/businesses" 
              className={`block py-2 text-gitflash-text hover:text-gitflash-primary link-underline ${
                location.pathname.includes('/business') ? 'text-gitflash-primary font-medium' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Unternehmen
            </Link>
            {isAuthenticated && (
              <Link 
                to="/interviews/explore" 
                className="block py-2 text-gitflash-text hover:text-gitflash-primary link-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meine Interviews
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
