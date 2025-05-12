
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
} from "@/components/ui/alert-dialog";
import { Check } from 'lucide-react';

interface AdminJobApproveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
}

export function AdminJobApproveDialog({ isOpen, onClose, onConfirm, jobTitle }: AdminJobApproveDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Job freigeben</AlertDialogTitle>
          <AlertDialogDescription>
            Sind Sie sicher, dass Sie den Job <strong>"{jobTitle}"</strong> freigeben möchten? 
            Der Job wird dann öffentlich sichtbar für alle Benutzer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="mr-2 h-4 w-4" /> Freigeben
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
