
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PublicJob } from '@/hooks/usePublicJobs';

interface ApplicationModalProps {
  job: PublicJob;
  onClose: () => void;
}

export function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bewerbung für {job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gitflash-text">
            Sie sind dabei, sich für die Position "{job.title}" zu bewerben.
          </p>
          
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Abbrechen
            </Button>
            <Button className="flex-1 bg-gitflash-primary hover:bg-gitflash-secondary">
              Bewerbung absenden
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
