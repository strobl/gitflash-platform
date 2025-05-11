
import { useState, useEffect } from 'react';
import { Logo } from './navbar/Logo';
import { DesktopNavigation } from './navbar/DesktopNavigation';
import { MobileNavigation } from './navbar/MobileNavigation';
import { AuthButtons } from './navbar/AuthButtons';

export function SharedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <DesktopNavigation />
          
          {/* User Menu or Login Button */}
          <div className="flex items-center">
            <AuthButtons />

            {/* Mobile Menu Button */}
            <div className="ml-2">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="w-full h-px bg-gray-200"></div>
    </header>
  );
}
