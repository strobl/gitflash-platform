
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleDropdown } from './RoleDropdown';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: string) => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onInvite 
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInvite = () => {
    if (!validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    
    onInvite(email, role);
    setEmail('');
    setRole('Viewer');
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Teammitglied einladen</DialogTitle>
          <DialogDescription>
            Senden Sie eine Einladung an ein neues Teammitglied.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rolle</Label>
            <RoleDropdown currentRole={role} onChange={setRole} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={handleInvite} className="bg-gitflash-primary hover:bg-gitflash-primary/90">
            Einladung senden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
