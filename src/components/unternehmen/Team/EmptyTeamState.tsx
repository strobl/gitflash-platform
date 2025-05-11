
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface EmptyTeamStateProps {
  onInviteClick: () => void;
}

export const EmptyTeamState: React.FC<EmptyTeamStateProps> = ({ onInviteClick }) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Ihr Team hat aktuell keine Mitglieder in diesem Projekt.
      </h3>
      <p className="text-gray-500 mb-6">
        Nutzen Sie die Suchfunktion, um Personen zu Ihrem Team hinzuzufügen.
      </p>
      <Button 
        onClick={onInviteClick} 
        className="bg-gitflash-primary hover:bg-gitflash-primary/90"
      >
        <UserPlus className="mr-2 h-4 w-4" /> Team zusammenstellen
      </Button>
    </div>
  );
};
