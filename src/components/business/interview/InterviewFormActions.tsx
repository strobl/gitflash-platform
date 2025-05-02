
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface InterviewFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function InterviewFormActions({ isSubmitting, onCancel }: InterviewFormActionsProps) {
  return (
    <div className="flex justify-between">
      <Button variant="outline" type="button" onClick={onCancel}>Abbrechen</Button>
      <Button type="submit" className="bg-gitflash-accent hover:bg-gitflash-accent/90" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Wird erstellt...
          </>
        ) : 'Interview erstellen'}
      </Button>
    </div>
  );
}
