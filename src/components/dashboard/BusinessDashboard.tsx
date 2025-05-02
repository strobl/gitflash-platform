import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { StatsCard } from '@/components/shared/StatsCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, FileSearch, MessageSquare, TrendingUp, User, Users } from 'lucide-react';
import { toast } from 'sonner';

export function BusinessDashboard() {
  const handleCreateInterview = () => {
    // In a real app, this would redirect to the interview creation page
    window.location.href = "/interviews/create";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unternehmens-Dashboard</h1>
          <p className="text-muted-foreground">Verwalten Sie Ihre Interviews und finden Sie passende Talente.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleCreateInterview}
            size="lg" 
            className="bg-gitflash-accent hover:bg-gitflash-accent/90"
          >
            Interview erstellen
            <MessageSquare className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline"
          >
            <Link to="/job/create">
              Stellenanzeige erstellen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          value="24" 
          label="Registrierte Talente" 
          trend={{ value: 8, label: "letzte Woche" }}
          icon={<Users className="h-5 w-5 text-gitflash-primary" />} 
        />
        <StatsCard 
          value="12" 
          label="Durchgeführte Interviews" 
          icon={<MessageSquare className="h-5 w-5 text-gitflash-accent" />} 
        />
        <StatsCard 
          value="3" 
          label="Offene Stellenanzeigen" 
          icon={<Building className="h-5 w-5 text-gitflash-secondary" />} 
        />
        <StatsCard 
          value="2" 
          label="Aktive Verträge" 
          icon={<FileSearch className="h-5 w-5 text-green-500" />} 
        />
      </div>

      <DashboardCard
        title="Neue Talent-Interviews"
        description="Kürzlich abgeschlossene Interviews"
        isHighlighted={true}
      >
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Talent</th>
                  <th className="px-4 py-2 text-left">Interview</th>
                  <th className="px-4 py-2 text-left">Score</th>
                  <th className="px-4 py-2 text-left">Datum</th>
                  <th className="px-4 py-2 text-right"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-gitflash-primary" />
                      </div>
                      <span>Markus Schmidt</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Bauingenieur Interview</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      92%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">Heute</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Ansehen</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-gitflash-primary" />
                      </div>
                      <span>Sandra Weber</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Architekt Assessment</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      87%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">Gestern</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Ansehen</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-gitflash-primary" />
                      </div>
                      <span>Thomas Mueller</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Projektmanagement</td>
                  <td className="px-4 py-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      76%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">23.04.2025</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Ansehen</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link to="/interviews">Alle Interviews anzeigen</Link>
          </Button>
        </div>
      </DashboardCard>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard
          title="Top-Talente"
          description="Die besten Talente basierend auf Interview-Ergebnissen"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-gitflash-primary" />
                </div>
                <div>
                  <p className="font-medium">Markus Schmidt</p>
                  <p className="text-sm text-muted-foreground">Bauingenieur • Berlin</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">92%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-gitflash-primary" />
                </div>
                <div>
                  <p className="font-medium">Sandra Weber</p>
                  <p className="text-sm text-muted-foreground">Architektin • Hamburg</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">87%</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-gitflash-primary" />
                </div>
                <div>
                  <p className="font-medium">Thomas Mueller</p>
                  <p className="text-sm text-muted-foreground">Projektmanager • München</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">76%</span>
              </div>
            </div>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/talents">Alle Talente anzeigen</Link>
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Aktivitäten & Trends"
          description="Überblick über Plattformaktivitäten"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-gitflash-primary/20 p-2 rounded">
                <TrendingUp className="h-5 w-5 text-gitflash-primary" />
              </div>
              <div>
                <p className="font-medium">Zunahme der Interview-Durchführungen</p>
                <p className="text-sm text-muted-foreground">Die Anzahl der durchgeführten Interviews ist im Vergleich zum Vormonat um 24% gestiegen.</p>
                <p className="text-xs text-gitflash-primary mt-1">Letzte Woche</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-gitflash-accent/20 p-2 rounded">
                <Users className="h-5 w-5 text-gitflash-accent" />
              </div>
              <div>
                <p className="font-medium">Neue Talentregistrierungen</p>
                <p className="text-sm text-muted-foreground">8 neue Talente haben sich in der letzten Woche registriert.</p>
                <p className="text-xs text-gitflash-primary mt-1">Letzte 7 Tage</p>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full">Analysen & Berichte</Button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
