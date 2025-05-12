
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="h-6 w-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Jobanzeigen</h3>
      <p className="mt-1 text-sm text-gray-500">
        Sie haben noch keine Jobanzeigen erstellt. Beginnen Sie damit, Ihre erste Jobanzeige zu erstellen.
      </p>
      <div className="mt-6">
        <Button asChild className="bg-gitflash-primary hover:bg-gitflash-primary/90">
          <Link to="/unternehmen/jobs/neu">
            <Plus className="mr-2 h-4 w-4" />
            Erste Jobanzeige erstellen
          </Link>
        </Button>
      </div>
    </div>
  );
};
