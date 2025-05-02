
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listConversations } from '@/services/tavusService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Navbar } from '@/components/navigation/Navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Interviews() {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!isAuthenticated) {
      toast.error('Sie müssen angemeldet sein, um Interviews zu sehen.');
      navigate('/login');
      return;
    }

    // Redirect if not a business user
    if (profile?.role !== 'business') {
      toast.error('Nur Unternehmen können Interviews verwalten.');
      navigate('/dashboard');
      return;
    }

    async function fetchInterviews() {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await listConversations();
        setInterviews(data || []);
      } catch (error: any) {
        console.error('Error fetching interviews:', error);
        setError(error.message || 'Fehler beim Laden der Interviews');
        toast.error(error.message || 'Fehler beim Laden der Interviews');
      } finally {
        setIsLoading(false);
      }
    }

    fetchInterviews();
  }, [user, profile, navigate, isAuthenticated]);

  const handleCreateInterview = () => {
    navigate('/interviews/create');
  };

  const handleViewInterview = (id: string) => {
    navigate(`/interviews/${id}`);
  };

  // If not authenticated or not a business user, don't render anything
  // (the useEffect will handle the redirect)
  if (!isAuthenticated || !user || profile?.role !== 'business') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">KI-Interviews</h1>
            <p className="text-muted-foreground">Verwalten und erstellen Sie Ihre KI-gestützten Interviews.</p>
          </div>
          <Button 
            onClick={handleCreateInterview}
            className="bg-gitflash-accent hover:bg-gitflash-accent/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Neues Interview erstellen
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Interviews werden geladen...</p>
          </div>
        ) : interviews.length === 0 ? (
          <div className="text-center border rounded-lg p-12 bg-muted/20">
            <div className="bg-gitflash-primary/20 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Keine Interviews gefunden</h3>
            <p className="text-muted-foreground mb-6">
              Sie haben noch keine KI-Interviews erstellt.
            </p>
            <Button 
              onClick={handleCreateInterview}
              className="bg-gitflash-accent hover:bg-gitflash-accent/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Jetzt erstes Interview erstellen
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Erstellt am</th>
                    <th className="px-4 py-3 text-right font-medium">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview) => (
                    <tr key={interview.id} className="border-b">
                      <td className="px-4 py-4">
                        <div className="font-medium">{interview.conversation_name}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {interview.status}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(interview.created_at).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewInterview(interview.id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
