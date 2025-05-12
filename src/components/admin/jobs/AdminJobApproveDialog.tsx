
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AdminJobApproveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
}

export const AdminJobApproveDialog: React.FC<AdminJobApproveDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Job freigeben</DialogTitle>
          <DialogDescription>
            Möchten Sie diesen Job wirklich öffentlich freigeben?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="font-medium">{jobTitle}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Nach der Freigabe wird der Job für alle Talente sichtbar und kann von diesen gefunden werden.
          </p>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            Freigeben
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
