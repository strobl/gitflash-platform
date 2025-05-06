import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, Filter, Tag, Briefcase, BookOpen, Scale, HardHat, Building2, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navigation/Navbar';
import { listPublicInterviews } from '@/services/tavusService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

// Kategorien für Interviews
const CATEGORIES = {
  all: { name: 'Alle', icon: Users },
  architecture: { name: 'Architektur', icon: Building2 },
  law: { name: 'Baurecht', icon: Scale },
  engineering: { name: 'Bauingenieurwesen', icon: HardHat },
  management: { name: 'Projektmanagement', icon: Briefcase },
  general: { name: 'Allgemein', icon: BookOpen },
};

// Hilfsfunktion zum Zuweisen einer Kategorie basierend auf Interview-Namen oder Kontext
const getCategoryForInterview = (interview) => {
  const name = interview.conversation_name.toLowerCase();
  const context = interview.conversation_context?.toLowerCase() || '';
  
  if (name.includes('architekt') || context.includes('architekt')) return 'architecture';
  if (name.includes('recht') || context.includes('recht') || name.includes('anwalt') || context.includes('anwalt')) return 'law';
  if (name.includes('ingenieur') || context.includes('ingenieur') || name.includes('bau') || context.includes('statik')) return 'engineering';
  if (name.includes('projekt') || context.includes('projekt') || name.includes('manage')) return 'management';
  
  return 'general';
};

export default function TalentInterviews() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    // Filter interviews based on search term and active category
    let filtered = interviews;
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(interview => 
        interview.conversation_name.toLowerCase().includes(lowerSearchTerm) || 
        interview.conversation_context?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(interview => 
        interview.category === activeCategory
      );
    }
    
    setFilteredInterviews(filtered);
  }, [searchTerm, activeCategory, interviews]);

  async function fetchInterviews() {
    setIsLoading(true);
    try {
      const data = await listPublicInterviews();
      
      // Kategorien zuweisen
      const interviewsWithCategories = data.map(interview => ({
        ...interview,
        category: getCategoryForInterview(interview)
      }));
      
      setInterviews(interviewsWithCategories);
      setFilteredInterviews(interviewsWithCategories);
    } catch (error) {
      console.error('Error fetching public interviews:', error);
      toast.error('Fehler beim Laden der Interviews');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCardClick = (id) => {
    navigate(`/interviews/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interview-Sammlung</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Probieren Sie unsere KI-gestützten Interview-Szenarien aus. 
            Wählen Sie eine Kategorie und starten Sie direkt ein kostenloses Interview.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 mb-8">
          <div className="w-full sm:w-3/4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Nach Interviews suchen..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full sm:w-1/4">
            <Button variant="outline" className="w-full flex items-center justify-between">
              <span>Filter</span>
              <Filter className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="all" 
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="w-full sm:w-auto flex justify-start overflow-x-auto pb-1">
            {Object.entries(CATEGORIES).map(([key, { name, icon: Icon }]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <Icon size={16} />
                <span>{name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="h-3 bg-gitflash-primary/20 w-full"></div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-5" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-9 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {filteredInterviews.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Keine Interviews gefunden</h3>
                <p className="text-muted-foreground mb-6">
                  Versuchen Sie, Ihre Suchkriterien zu ändern oder eine andere Kategorie auszuwählen.
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}>
                  Filter zurücksetzen
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInterviews.map((interview) => {
                  const CategoryIcon = CATEGORIES[interview.category]?.icon || CATEGORIES.general.icon;
                  
                  return (
                    <Card 
                      key={interview.id} 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleCardClick(interview.id)}
                    >
                      <CardHeader className="p-0">
                        <div className="h-3 bg-gitflash-primary w-full"></div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <Badge variant="outline" className="mb-3 flex items-center w-fit gap-1">
                          <CategoryIcon size={14} />
                          <span>{CATEGORIES[interview.category]?.name || 'Allgemein'}</span>
                        </Badge>
                        <CardTitle>{interview.conversation_name}</CardTitle>
                        <CardDescription className="line-clamp-3 mt-2">
                          {interview.conversation_context || 'Keine Beschreibung verfügbar.'}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gitflash-accent hover:bg-gitflash-accent/90">
                          Details anzeigen
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
