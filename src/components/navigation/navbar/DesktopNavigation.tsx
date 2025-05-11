
import { Link, useLocation } from 'react-router-dom';

export const DesktopNavigation = () => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/interviews" 
        className={`text-gitflash-text hover:text-gitflash-primary transition-colors link-underline ${
          location.pathname.includes('/interview') ? 'text-gitflash-primary font-medium' : ''
        }`}
      >
        Interviews
      </Link>
      <Link 
        to="/talent" 
        className={`text-gitflash-text hover:text-gitflash-primary transition-colors link-underline ${
          location.pathname.includes('/talent') ? 'text-gitflash-primary font-medium' : ''
        }`}
      >
        Akademiker
      </Link>
      <Link 
        to="/unternehmen/suche" 
        className={`text-gitflash-text hover:text-gitflash-primary transition-colors link-underline ${
          location.pathname.includes('/unternehmen') ? 'text-gitflash-primary font-medium' : ''
        }`}
      >
        Für Unternehmen
      </Link>
    </nav>
  );
};
