
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface AdminJobRejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  jobTitle: string;
}

export function AdminJobRejectDialog({ isOpen, onClose, onConfirm, jobTitle }: AdminJobRejectDialogProps) {
  const [reason, setReason] = useState('');
  
  const handleSubmit = () => {
    onConfirm(reason);
    setReason('');
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Job ablehnen</AlertDialogTitle>
          <AlertDialogDescription>
            Bitte geben Sie einen Grund an, warum der Job <strong>"{jobTitle}"</strong> abgelehnt wird.
            Dies wird dem Ersteller des Jobs mitgeteilt.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder="Begründung für die Ablehnung..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>Abbrechen</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleSubmit}
            disabled={!reason.trim()}
          >
            <X className="mr-2 h-4 w-4" /> Ablehnen
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
