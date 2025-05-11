
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

interface RemoveConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
}

export const RemoveConfirmDialog: React.FC<RemoveConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  memberName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Teammitglied entfernen</AlertDialogTitle>
          <AlertDialogDescription>
            Sind Sie sicher, dass Sie {memberName} aus Ihrem Team entfernen möchten? 
            Diese Aktion kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Entfernen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
