
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 p-3 rounded-full">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Jobanzeigen</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Erstellen Sie Ihre erste Jobanzeige, um mit der Suche nach Talenten zu beginnen.
      </p>
      <Button asChild className="bg-gitflash-primary hover:bg-gitflash-primary/90">
        <Link to="/unternehmen/jobs/neu">
          <PlusCircle className="mr-2 h-4 w-4" />
          Erste Jobanzeige erstellen
        </Link>
      </Button>
    </div>
  );
};
