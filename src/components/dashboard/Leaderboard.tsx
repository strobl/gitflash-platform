
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, User, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  user_name: string;
  role: string;
  location: string | null;
  average_score: number;
  interview_count: number;
}

interface LeaderboardProps {
  limit?: number;
  showSearch?: boolean;
  showFilters?: boolean;
  showViewAllButton?: boolean;
  className?: string;
}

export function Leaderboard({
  limit = 5,
  showSearch = false,
  showFilters = false,
  showViewAllButton = false,
  className = ''
}: LeaderboardProps) {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        setIsLoading(true);
        
        // Get current user ID
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id || null;
        setCurrentUserId(userId);
        
        // Fetch leaderboard data
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            name,
            role,
            location
          `)
          .eq('role', 'user') // Only talent users
          .order('name');
        
        if (error) throw error;
        
        // For demonstration purposes, generate random scores
        // In a real application, this would come from actual interview data
        const leaderboardData = data.map(profile => ({
          id: profile.id,
          user_id: profile.id,
          user_name: profile.name,
          role: profile.role,
          location: profile.location || null,
          average_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-99
          interview_count: Math.floor(Math.random() * 5) + 1, // Random count between 1-5
        }));
        
        // Sort by score (highest first)
        const sortedData = leaderboardData.sort((a, b) => b.average_score - a.average_score);
        
        setEntries(sortedData);
        setFilteredEntries(sortedData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        toast.error('Fehler beim Laden des Leaderboards');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchLeaderboardData();
  }, []);
  
  useEffect(() => {
    // Apply filters and search
    let result = [...entries];
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(entry => entry.role === roleFilter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(entry => 
        entry.user_name.toLowerCase().includes(query) || 
        (entry.location && entry.location.toLowerCase().includes(query))
      );
    }
    
    setFilteredEntries(result);
  }, [entries, searchQuery, roleFilter]);
  
  const displayedEntries = limit ? filteredEntries.slice(0, limit) : filteredEntries;
  
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-6 w-6 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Leaderboard wird geladen...</p>
      </div>
    );
  }
  
  // Get user's rank if they're on the leaderboard
  const currentUserRank = currentUserId 
    ? filteredEntries.findIndex(entry => entry.user_id === currentUserId) + 1 
    : -1;
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and filter options */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nach Namen oder Ort suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {showFilters && (
            <div className="w-full sm:w-[200px]">
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Rolle</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Rollen</SelectItem>
                  <SelectItem value="user">Talent</SelectItem>
                  <SelectItem value="business">Unternehmen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
      
      {/* Leaderboard entries */}
      <div className="space-y-4">
        {displayedEntries.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Keine Einträge gefunden</p>
          </div>
        ) : (
          displayedEntries.map((entry, index) => {
            const isCurrentUser = entry.user_id === currentUserId;
            const rank = index + 1;
            
            return (
              <div 
                key={entry.id}
                className={`flex items-center justify-between border-b pb-3 ${
                  isCurrentUser ? 'bg-gitflash-primary/10 -mx-6 px-6' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    h-6 w-6 rounded-full flex items-center justify-center text-xs
                    ${rank === 1 ? 'bg-yellow-500 text-white' : 
                      rank === 2 ? 'bg-gray-300 text-gray-800' :
                      rank === 3 ? 'bg-amber-700 text-white' :
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {rank}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-gitflash-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {entry.user_name}
                        {isCurrentUser && <span className="ml-1 text-sm">(Sie)</span>}
                      </p>
                      {entry.location && (
                        <p className="text-xs text-muted-foreground">{entry.location}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {rank <= 3 && <Award className="h-4 w-4 mr-1 text-amber-500" />}
                  <span className="font-medium">{entry.average_score}%</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Show current user's rank if not in the displayed list */}
      {currentUserId && currentUserRank > limit && (
        <div className="flex items-center justify-between border-b pb-3 bg-gitflash-primary/10 -mx-6 px-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-xs">
              {currentUserRank}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gitflash-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-gitflash-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {entries.find(e => e.user_id === currentUserId)?.user_name || 'Sie'}
                  <span className="ml-1 text-sm">(Sie)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="font-medium">
              {entries.find(e => e.user_id === currentUserId)?.average_score || 0}%
            </span>
          </div>
        </div>
      )}
      
      {/* View all button */}
      {showViewAllButton && (
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => navigate('/leaderboard')}
        >
          Vollständiges Leaderboard anzeigen
        </Button>
      )}
    </div>
  );
}
