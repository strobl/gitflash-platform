
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { StatsCard } from '@/components/shared/StatsCard';
import { Progress } from '@/components/ui/progress';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, FileSearch, MessageSquare, Star } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Leaderboard } from './Leaderboard';

export function TalentDashboard() {
  const navigate = useNavigate();
  const profileCompleteness = 60; // Beispielwert
  const [availableInterviews, setAvailableInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Lade verfügbare Interviews für Talente
  useEffect(() => {
    const fetchAvailableInterviews = async () => {
      setIsLoading(true);
      try {
        // Hole alle Interviews im Status "pending" oder "active"
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .or('status.eq.pending,status.eq.active')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setAvailableInterviews(data || []);
      } catch (error) {
        console.error('Error loading interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableInterviews();
  }, []);

  const handleStartInterview = () => {
    // Für ein echtes System: Navigiere zur Interview-Übersicht
    navigate('/interviews');
  };

  const handleViewInterview = (id: string) => {
    navigate(`/interviews/${id}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Willkommen zurück!</h1>
          <p className="text-muted-foreground">Hier finden Sie eine Übersicht Ihres Talents-Kontos.</p>
        </div>
        <Button 
          onClick={handleStartInterview}
          size="lg" 
          className="bg-gitflash-primary hover:bg-gitflash-secondary"
        >
          Interviews ansehen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <DashboardCard
        title="Profilstatus"
        description="Vervollständigen Sie Ihr Profil, um von mehr Unternehmen gefunden zu werden"
        isHighlighted={true}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Profilfortschritt</span>
              <span className="text-sm font-medium">{profileCompleteness}%</span>
            </div>
            <Progress value={profileCompleteness} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-amber-500" />
              <div>
                <p className="font-medium">Lebenslauf hochladen</p>
                <p className="text-sm text-muted-foreground">Laden Sie Ihren aktuellen Lebenslauf hoch</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-red-500" />
              <div>
                <p className="font-medium">Fähigkeiten hinzufügen</p>
                <p className="text-sm text-muted-foreground">Fügen Sie Ihre Fähigkeiten hinzu, um bessere Matches zu erhalten</p>
              </div>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link to="/profile">Profil vervollständigen</Link>
          </Button>
        </div>
      </DashboardCard>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          value="85%" 
          label="Interview Score" 
          icon={<Star className="h-5 w-5 text-yellow-500" />} 
        />
        <StatsCard 
          value="2" 
          label="Durchgeführte Interviews" 
          icon={<MessageSquare className="h-5 w-5 text-gitflash-primary" />} 
        />
        <StatsCard 
          value="8" 
          label="Profilaufrufe" 
          trend={{ value: 12, label: "letzte Woche" }}
          icon={<FileSearch className="h-5 w-5 text-gitflash-accent" />} 
        />
        <StatsCard 
          value="3" 
          label="Offene Jobangebote" 
          icon={<Calendar className="h-5 w-5 text-gitflash-secondary" />} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard
          title="Leaderboard"
          description="Sehen Sie, wie Sie im Vergleich abschneiden"
        >
          <Leaderboard limit={4} showViewAllButton={true} />
        </DashboardCard>

        <DashboardCard
          title="Verfügbare Interviews"
          description="Nehmen Sie an KI-Interviews teil und verbessern Sie Ihren Score"
        >
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Interviews werden geladen...</p>
              </div>
            ) : availableInterviews.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Derzeit sind keine Interviews verfügbar.</p>
              </div>
            ) : (
              availableInterviews.map(interview => (
                <div key={interview.id} className="border rounded-md p-3 hover:border-gitflash-primary transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{interview.conversation_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {interview.status === 'pending' ? 'Bereit zur Teilnahme' : 'Aktiv'}
                      </p>
                    </div>
                    {interview.status === 'pending' && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Neu</span>
                    )}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gitflash-primary" 
                      onClick={() => handleViewInterview(interview.id)}
                    >
                      Details ansehen
                    </Button>
                  </div>
                </div>
              ))
            )}

            <Button asChild variant="outline" className="w-full">
              <Link to="/interviews">Alle verfügbaren Interviews anzeigen</Link>
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
