
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function InterviewCreator() {
  const navigate = useNavigate();
  
  const handleCreateInterview = () => {
    navigate('/interviews/create');
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">KI-Interviews erstellen</h2>
      <p className="text-muted-foreground">
        Erstellen Sie personalisierte KI-Interviews für potenzielle Kandidaten.
        Mit unserer Plattform können Sie maßgeschneiderte Interviewszenarien definieren.
      </p>
      <Button 
        onClick={handleCreateInterview}
        className="bg-gitflash-accent hover:bg-gitflash-accent/90"
      >
        Neues Interview erstellen
      </Button>
    </div>
  );
}
