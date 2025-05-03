
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, MessageSquare, Plus, Search, Filter, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { listConversations } from '@/services/tavusService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Navbar } from '@/components/navigation/Navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

export default function Interviews() {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

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

    fetchInterviews();
  }, [user, profile, navigate, isAuthenticated]);

  useEffect(() => {
    // Filter and search logic
    let result = [...interviews];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(interview => interview.status === statusFilter);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(interview => 
        interview.conversation_name.toLowerCase().includes(query)
      );
    }

    setFilteredInterviews(result);
    setTotalPages(Math.max(1, Math.ceil(result.length / itemsPerPage)));
    setCurrentPage(1); // Reset to first page when filters change
  }, [interviews, searchQuery, statusFilter]);

  async function fetchInterviews() {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await listConversations();
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

  const handleCreateInterview = () => {
    navigate('/interviews/create');
  };

  const handleViewInterview = (id: string) => {
    navigate(`/interviews/${id}`);
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

  // Status badge component with color variations
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">{status}</Badge>;
      case 'pending':
        return <Badge variant="secondary">{status}</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 text-white">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // If not authenticated or not a business user, don't render anything
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
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Interviews werden geladen...</p>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="text-center border rounded-lg p-12 bg-muted/20">
            <div className="bg-gitflash-primary/20 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-gitflash-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Keine Interviews gefunden</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Keine Interviews entsprechen den Suchkriterien.' 
                : 'Sie haben noch keine KI-Interviews erstellt.'}
            </p>
            {searchQuery || statusFilter !== 'all' ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Filter zurücksetzen
              </Button>
            ) : (
              <Button 
                onClick={handleCreateInterview}
                className="bg-gitflash-accent hover:bg-gitflash-accent/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Jetzt erstes Interview erstellen
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
                    <TableHead>Status</TableHead>
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
                      <TableCell>
                        <StatusBadge status={interview.status} />
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
