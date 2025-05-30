
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const SharedNavbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gitflash-primary">
            GitFlash
          </Link>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Anmelden</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
