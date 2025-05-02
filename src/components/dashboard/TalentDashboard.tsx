
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { StatsCard } from '@/components/shared/StatsCard';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Calendar, FileSearch, MessageSquare, Star } from 'lucide-react';
import { toast } from 'sonner';

export function TalentDashboard() {
  const profileCompleteness = 60; // Example value

  const handleStartInterview = () => {
    // In a real app, this would start or redirect to an interview
    toast.info('KI-Interview würde jetzt gestartet werden.');
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
          KI-Interview starten
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
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">1</div>
                <span className="font-medium">Sandra Müller</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-yellow-500 mr-1" />
                <span>97%</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-300 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">2</div>
                <span className="font-medium">Thomas Weber</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-gray-500 mr-1" />
                <span>92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2 bg-gitflash-primary/10 -mx-6 px-6">
              <div className="flex items-center gap-2">
                <div className="bg-amber-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">3</div>
                <span className="font-medium">Sie</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-amber-700 mr-1" />
                <span>85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 text-gray-800 h-6 w-6 rounded-full flex items-center justify-center text-xs">4</div>
                <span className="font-medium">Julia Schmidt</span>
              </div>
              <div className="flex items-center">
                <span>78%</span>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Passende Jobs"
          description="Offene Stellen, die zu Ihrem Profil passen"
        >
          <div className="space-y-4">
            <div className="border rounded-md p-3 hover:border-gitflash-primary transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Bauingenieur (m/w/d)</h3>
                  <p className="text-sm text-muted-foreground">Max Bau GmbH · Berlin</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Neu</span>
              </div>
              <p className="text-sm mt-2">Wir suchen einen erfahrenen Bauingenieur für anspruchsvolle Projekte im Raum Berlin.</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-gitflash-primary">
                  Details ansehen
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-3 hover:border-gitflash-primary transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Projektleiter Hochbau</h3>
                  <p className="text-sm text-muted-foreground">Schmidt & Partner · Hamburg</p>
                </div>
              </div>
              <p className="text-sm mt-2">Führen Sie ein Team von Bauingenieuren und überwachen Sie komplexe Hochbauprojekte.</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="text-gitflash-primary">
                  Details ansehen
                </Button>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full">
              <Link to="/jobs">Alle passenden Jobs anzeigen</Link>
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
