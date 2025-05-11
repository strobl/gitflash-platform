
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ChevronRight, Star, BarChart3, BookOpen } from "lucide-react";

const TalentStartseitePanel: React.FC = () => {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading of dashboard data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Willkommen{profile?.name ? `, ${profile.name}` : ' zurück'}</h2>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Deine Statistiken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
              <div className="rounded-full bg-blue-100 p-2">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Profil-Score</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
              <div className="rounded-full bg-green-100 p-2">
                <CalendarDays className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Interviews</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
              <div className="rounded-full bg-amber-100 p-2">
                <BarChart3 className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Profilaufrufe</p>
                <p className="text-2xl font-bold">14</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="contracts" className="mb-6">
        <TabsList>
          <TabsTrigger value="contracts">Verträge</TabsTrigger>
          <TabsTrigger value="applications">Bewerbungen</TabsTrigger>
          <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center flex-col py-8 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Keine Verträge vorhanden</h3>
                <p className="text-gray-500 mb-4 max-w-md">
                  Du hast noch keine aktiven Verträge. Erkunde verfügbare Projekte und bewerbe dich jetzt.
                </p>
                <button className="flex items-center text-gitflash-primary font-medium">
                  Projekte erkunden <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center flex-col py-8 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Keine Bewerbungen vorhanden</h3>
                <p className="text-gray-500 mb-4 max-w-md">
                  Du hast dich noch nicht beworben. Finde passende Projekte in der Erkunden-Sektion.
                </p>
                <button className="flex items-center text-gitflash-primary font-medium">
                  Projekte erkunden <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center flex-col py-8 text-center">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Keine Empfehlungen vorhanden</h3>
                <p className="text-gray-500 mb-4 max-w-md">
                  Vervollständige dein Profil, um passende Empfehlungen zu erhalten.
                </p>
                <button className="flex items-center text-gitflash-primary font-medium">
                  Profil bearbeiten <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentStartseitePanel;
