
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash/LogoGF.svg" 
        alt="GitFlash Logo" 
        className="h-5 md:h-6 w-auto" 
      />
    </Link>
  );
};
