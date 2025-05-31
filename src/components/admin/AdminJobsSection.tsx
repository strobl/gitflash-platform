import React, { useState } from 'react';
import { useAdminJobs } from '@/hooks/useAdminJobs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Users, MapPin, DollarSign } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const AdminJobsSection: React.FC = () => {
  const { jobs, isLoading, error, toggleJobPublic, setJobStatus } = useAdminJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [publicFilter, setPublicFilter] = useState('all');

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.profiles?.name && job.profiles.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesPublic = publicFilter === 'all' || 
                         (publicFilter === 'public' && job.is_public) ||
                         (publicFilter === 'private' && !job.is_public);
    
    return matchesSearch && matchesStatus && matchesPublic;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'draft': 'outline',
      'pending': 'secondary',
      'approved': 'default',
      'rejected': 'destructive'
    };
    
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const formatSalary = (min: string, max: string) => {
    if (min === '0' && max === '0') return 'Nach Vereinbarung';
    if (min === max) return `${min}€/Stunde`;
    return `${min}€ - ${max}€/Stunde`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const handleStatusChange = (jobId: string, newStatus: 'draft' | 'pending' | 'approved' | 'rejected') => {
    setJobStatus(jobId, newStatus);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Jobs werden geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-destructive mb-2">Fehler beim Laden</h3>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Jobs durchsuchen..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-[200px]">
          <Select value={publicFilter} onValueChange={setPublicFilter}>
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

      {/* Jobs Table */}
      {filteredJobs.length === 0 ? (
        <div className="text-center border rounded-lg p-12 bg-muted/20">
          <h3 className="text-xl font-semibold mb-2">Keine Jobs gefunden</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== 'all' || publicFilter !== 'all'
              ? 'Keine Jobs entsprechen den Suchkriterien.'
              : 'Es wurden noch keine Jobs erstellt.'}
          </p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Erstellt von</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Öffentlich</TableHead>
                <TableHead>Statistiken</TableHead>
                <TableHead>Erstellt am</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{job.title}</div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-3">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{job.profiles?.name || 'Unbekannt'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(job.status)}
                      {job.status === 'pending' && (
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(job.id, 'approved')}
                          >
                            Genehmigen
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleStatusChange(job.id, 'rejected')}
                          >
                            Ablehnen
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={job.is_public}
                        onCheckedChange={() => toggleJobPublic(job.id, job.is_public)}
                        disabled={job.status !== 'approved'}
                      />
                      <Label className={job.status !== 'approved' ? 'text-muted-foreground' : ''}>
                        {job.is_public ? 'Ja' : 'Nein'}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {job.views}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {job.applicants}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(job.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{job.title}</DialogTitle>
                          <DialogDescription>
                            {job.location} • {job.contract_type}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Beschreibung</h4>
                            <p className="text-sm text-muted-foreground">{job.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Vertragsart:</span> {job.contract_type}
                            </div>
                            <div>
                              <span className="font-medium">Abrechnungsart:</span> {job.billing_type}
                            </div>
                            <div>
                              <span className="font-medium">Gehalt:</span> {formatSalary(job.hourly_rate_min, job.hourly_rate_max)}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {getStatusBadge(job.status)}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
