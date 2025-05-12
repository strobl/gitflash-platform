import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Search, Filter, Briefcase, Settings, Users, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { listAllInterviews, toggleInterviewVisibility } from '@/services/tavusService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Navbar } from '@/components/navigation/Navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DashboardCard } from '@/components/shared/DashboardCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AdminDashboard() {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Redirect if not logged in
    if (!isAuthenticated) {
      toast.error('Sie müssen angemeldet sein, um diese Seite anzuzeigen.');
      navigate('/login');
      return;
    }

    // Redirect if not an operator
    if (profile?.role !== 'operator') {
      toast.error('Nur Administratoren können auf diese Seite zugreifen.');
      navigate('/dashboard');
      return;
    }

    fetchAllInterviews();
  }, [user, profile, navigate, isAuthenticated]);

  useEffect(() => {
    // Filter and search logic
    let result = [...interviews];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(interview => interview.status === statusFilter);
    }

    // Apply visibility filter
    if (visibilityFilter !== 'all') {
      const isVisible = visibilityFilter === 'public';
      result = result.filter(interview => interview.is_public === isVisible);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(interview => 
        interview.conversation_name.toLowerCase().includes(query) || 
        (interview.profiles?.name && interview.profiles.name.toLowerCase().includes(query))
      );
    }

    setFilteredInterviews(result);
    setTotalPages(Math.max(1, Math.ceil(result.length / itemsPerPage)));
    setCurrentPage(1); // Reset to first page when filters change
  }, [interviews, searchQuery, statusFilter, visibilityFilter]);

  async function fetchAllInterviews() {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await listAllInterviews();
      setInterviews(data || []);
      setFilteredInterviews(data || []);
      setTotalPages(Math.max(1, Math.ceil((data?.length || 0) / itemsPerPage)));
    } catch (error: any) {
      console.error('Error fetching interviews:', error);
      setError(error.message || 'Fehler beim Laden der Interviews');
      toast.error(error.message || 'Fehler beim Laden der Interviews');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle visibility toggle
  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await toggleInterviewVisibility(id, !currentVisibility);
      
      // Update local state
      const updatedInterviews = interviews.map(interview => 
        interview.id === id 
          ? { ...interview, is_public: !currentVisibility } 
          : interview
      );
      
      setInterviews(updatedInterviews);
      toast.success(`Interview ist jetzt ${!currentVisibility ? 'öffentlich' : 'nicht öffentlich'}`);
    } catch (error: any) {
      console.error('Error toggling visibility:', error);
      toast.error(error.message || 'Fehler beim Ändern der Sichtbarkeit');
    }
  };

  const handleViewInterview = (id: string) => {
    navigate(`/interviews/${id}`);
  };

  // Admin action card handlers
  const handleNavigateToJobApprovals = () => {
    navigate('/admin/jobs/approval');
  };

  const handleNavigateToUserManagement = () => {
    // This would link to a user management page if it existed
    toast.info('Benutzer-Verwaltung ist noch in Entwicklung');
  };

  const handleNavigateToSystemSettings = () => {
    // This would link to a settings page if it existed
    toast.info('System-Einstellungen sind noch in Entwicklung');
  };

  const handleNavigateToAnalytics = () => {
    // This would link to an analytics page if it existed
    toast.info('Analysen sind noch in Entwicklung');
  };

  // Get current page of interviews
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredInterviews.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // If not authenticated or not an operator user, don't render anything
  if (!isAuthenticated || profile?.role !== 'operator') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Verwalten Sie alle Funktionen der Plattform</p>
          </div>
        </div>

        {/* Admin Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <DashboardCard 
            title="Job-Freigaben"
            description="Prüfen und verwalten Sie eingereichte Jobs"
            className="hover:border-gitflash-primary transition-colors"
            onClick={handleNavigateToJobApprovals}
          >
            <div className="flex items-center justify-between">
              <div className="bg-gitflash-primary/10 rounded-full p-3">
                <Briefcase className="h-6 w-6 text-gitflash-primary" />
              </div>
              <Button 
                variant="ghost" 
                className="text-gitflash-primary" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToJobApprovals();
                }}
              >
                Anzeigen
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Benutzer-Verwaltung"
            description="Benutzer und Berechtigungen verwalten"
            className="hover:border-gitflash-accent transition-colors"
            onClick={handleNavigateToUserManagement}
          >
            <div className="flex items-center justify-between">
              <div className="bg-gitflash-accent/10 rounded-full p-3">
                <Users className="h-6 w-6 text-gitflash-accent" />
              </div>
              <Button 
                variant="ghost" 
                className="text-gitflash-accent" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToUserManagement();
                }}
              >
                Anzeigen
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="System-Einstellungen"
            description="Konfigurieren Sie die Plattform-Einstellungen"
            className="hover:border-gitflash-secondary transition-colors"
            onClick={handleNavigateToSystemSettings}
          >
            <div className="flex items-center justify-between">
              <div className="bg-gitflash-secondary/10 rounded-full p-3">
                <Settings className="h-6 w-6 text-gitflash-secondary" />
              </div>
              <Button 
                variant="ghost" 
                className="text-gitflash-secondary" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToSystemSettings();
                }}
              >
                Anzeigen
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Analysen & Berichte"
            description="Einsichten und Statistiken zur Plattform"
            className="hover:border-green-500 transition-colors"
            onClick={handleNavigateToAnalytics}
          >
            <div className="flex items-center justify-between">
              <div className="bg-green-500/10 rounded-full p-3">
                <LineChart className="h-6 w-6 text-green-500" />
              </div>
              <Button 
                variant="ghost" 
                className="text-green-500" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToAnalytics();
                }}
              >
                Anzeigen
              </Button>
            </div>
          </DashboardCard>
        </div>

        <h2 className="text-xl font-bold mb-6">Interview-Verwaltung</h2>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Interviews durchsuchen..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-[200px]">
            <Select 
              value={visibilityFilter} 
              onValueChange={setVisibilityFilter}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Sichtbarkeit</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                <SelectItem value="public">Öffentlich</SelectItem>
                <SelectItem value="private">Privat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Interviews werden geladen...</p>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="text-center border rounded-lg p-12 bg-muted/20">
            <h3 className="text-xl font-semibold mb-2">Keine Interviews gefunden</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || statusFilter !== 'all' || visibilityFilter !== 'all'
                ? 'Keine Interviews entsprechen den Suchkriterien.' 
                : 'Es wurden noch keine Interviews erstellt.'}
            </p>
            {(searchQuery || statusFilter !== 'all' || visibilityFilter !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setVisibilityFilter('all');
                }}
              >
                Filter zurücksetzen
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Erstellt von</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Öffentlich</TableHead>
                    <TableHead>Erstellt am</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentItems().map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell>
                        <div className="font-medium">{interview.conversation_name}</div>
                      </TableCell>
                      <TableCell>{interview.profiles?.name || 'Unbekannt'}</TableCell>
                      <TableCell>
                        <Badge variant={interview.status === 'active' ? 'success' : 'secondary'}>
                          {interview.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={interview.is_public}
                            onCheckedChange={() => handleToggleVisibility(interview.id, interview.is_public)}
                          />
                          <Label>{interview.is_public ? 'Ja' : 'Nein'}</Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(interview.created_at).toLocaleDateString('de-DE')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewInterview(interview.id)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
}
