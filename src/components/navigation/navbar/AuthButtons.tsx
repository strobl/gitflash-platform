
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserMenu } from './UserMenu';

export const AuthButtons = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <UserMenu />;
  }
  
  return (
    <Button asChild className="bg-gitflash-primary hover:bg-gitflash-primary hover:brightness-105 transition-all duration-300 text-white">
      <Link to="/login">Anmelden</Link>
    </Button>
  );
};
