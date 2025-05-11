
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Applicant } from './types';
import { useApplicants } from '@/hooks/useJobDetail';

interface ApplicantsTabProps {
  applicants: Applicant[];
}

type SortField = 'name' | 'appliedAt' | 'score' | 'status';
type SortDir = 'asc' | 'desc';

export const ApplicantsTab: React.FC<ApplicantsTabProps> = ({ applicants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('appliedAt');
  const [sortDirection, setSortDirection] = useState<SortDir>('desc');
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>(applicants);
  
  const { sortApplicants, filterApplicants } = useApplicants();

  // Filter and sort applicants when dependencies change
  useEffect(() => {
    const filtered = filterApplicants(applicants, searchTerm);
    const sorted = sortApplicants(filtered, sortField, sortDirection);
    setFilteredApplicants(sorted);
  }, [applicants, searchTerm, sortField, sortDirection, filterApplicants, sortApplicants]);

  // Handle search with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Toggle sort direction or set new sort field
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date to German locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get sort icon based on current sort state
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Bewerber suchen..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredApplicants.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-medium flex items-center p-0 hover:bg-transparent"
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-medium flex items-center p-0 hover:bg-transparent"
                    onClick={() => handleSort('appliedAt')}
                  >
                    Bewerbungsdatum {getSortIcon('appliedAt')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-medium flex items-center p-0 hover:bg-transparent"
                    onClick={() => handleSort('score')}
                  >
                    Score {getSortIcon('score')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-medium flex items-center p-0 hover:bg-transparent"
                    onClick={() => handleSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map(applicant => (
                <TableRow 
                  key={applicant.id} 
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">
                    <Link 
                      to={`/unternehmen/talent/${applicant.id}`}
                      className="flex items-center gap-2"
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {applicant.profilePic ? (
                          <img 
                            src={applicant.profilePic} 
                            alt={applicant.name}
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">
                            {applicant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <span>{applicant.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(applicant.appliedAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            applicant.score >= 80 ? 'bg-green-500' : 
                            applicant.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${applicant.score}%` }}
                        />
                      </div>
                      <span className="text-sm">{applicant.score}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      applicant.status === 'Neu' ? 'bg-blue-100 text-blue-800' :
                      applicant.status === 'In Bearbeitung' ? 'bg-yellow-100 text-yellow-800' :
                      applicant.status === 'Vorstellungsgespräch' ? 'bg-purple-100 text-purple-800' :
                      applicant.status === 'Angebot' ? 'bg-green-100 text-green-800' :
                      applicant.status === 'Eingestellt' ? 'bg-teal-100 text-teal-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {applicant.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Keine Bewerber gefunden</p>
        </div>
      )}
    </div>
  );
};
