
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CloseJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
}

export const CloseJobDialog: React.FC<CloseJobDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Jobanzeige schließen</AlertDialogTitle>
          <AlertDialogDescription>
            Sind Sie sicher, dass Sie die Jobanzeige <strong>"{jobTitle}"</strong> schließen möchten? 
            Geschlossene Jobanzeigen sind nicht mehr öffentlich sichtbar und erhalten keine Bewerbungen mehr.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Jobanzeige schließen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
