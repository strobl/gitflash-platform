
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[32px] h-[32px]"
        >
          <path d="M16.5526 6.66667H28.0003C28.7367 6.66667 29.3337 7.26363 29.3337 8V26.6667C29.3337 27.4031 28.7367 28 28.0003 28H4.00033C3.26395 28 2.66699 27.4031 2.66699 26.6667V5.33333C2.66699 4.59696 3.26395 4 4.00033 4H13.8859L16.5526 6.66667ZM5.33366 6.66667V25.3333H26.667V9.33333H15.4481L12.7814 6.66667H5.33366ZM14.667 16V12H17.3337V16H21.3337V18.6667H17.3337V22.6667H14.667V18.6667H10.667V16H14.667Z" fill="#0A2540" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">
        Sie haben noch keine Jobanzeige erstellt.
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        Bitte erstellen Sie eine neue Jobanzeige über den Button „Job erstellen" oben und beginnen Sie mit der Auswahl geeigneter Kandidat:innen.
      </p>
      <Button asChild className="bg-gitflash-primary hover:bg-gitflash-primary/90">
        <Link to="/unternehmen/jobs/neu">Erste Jobanzeige erstellen</Link>
      </Button>
    </div>
  );
};
