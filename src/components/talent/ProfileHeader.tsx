
import React from 'react';
import { TalentProfile } from '@/types/talent-profile';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  profile: TalentProfile;
  isEditable: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isEditable }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Mein Talent-Profil</h1>
        <div>
          <Badge 
            className={`
              ${profile.status === 'draft' ? 'bg-yellow-500' : ''} 
              ${profile.status === 'submitted' ? 'bg-blue-500' : ''}
              ${profile.status === 'approved' ? 'bg-green-500' : ''}
              ${profile.status === 'rejected' ? 'bg-red-500' : ''}
            `}
          >
            Status: {profile.status === 'draft' ? 'Entwurf' : 
                   profile.status === 'submitted' ? 'Eingereicht' : 
                   profile.status === 'approved' ? 'Freigegeben' : 'Abgelehnt'}
          </Badge>
        </div>
      </div>
      <p className="text-muted-foreground mt-1">
        {isEditable 
          ? "Fülle dein Profil vollständig aus, um von Unternehmen gefunden zu werden." 
          : "Dein Profil wurde eingereicht und wird überprüft."}
      </p>
    </div>
  );
};
