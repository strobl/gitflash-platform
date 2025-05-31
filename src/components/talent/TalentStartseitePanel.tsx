import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTalentProfile } from "@/hooks/useTalentProfile";
import { useApplications } from "@/hooks/useApplications";
import { usePublicJobs } from "@/hooks/usePublicJobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight, Star, BarChart3, BookOpen, FileText, Eye, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TalentStartseitePanel: React.FC = () => {
  const { user, profile } = useAuth();
  const { data: talentProfile, isLoading: profileLoading } = useTalentProfile();
  const { applications, loading: applicationsLoading } = useApplications({ type: 'talent' });
  const { jobs: availableJobs, isLoading: jobsLoading } = usePublicJobs();
  
  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    if (!talentProfile) return 0;
    
    let completedFields = 0;
    const totalFields = 5;
    
    if (talentProfile.headline?.trim()) completedFields++;
    if (talentProfile.summary?.trim()) completedFields++;
    if (talentProfile.skills?.trim()) completedFields++;
    if (talentProfile.cv_url) completedFields++;
    if (talentProfile.status === 'approved') completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  // Calculate interview score (placeholder - you can enhance this)
  const getInterviewScore = () => {
    // This could be calculated from actual interview data
    return "78%";
  };

  // Get profile views (placeholder)
  const getProfileViews = () => {
    // This could come from a tracking system
    return Math.floor(Math.random() * 20) + 5;
  };

  const profileCompleteness = calculateProfileCompleteness();
  const isLoading = profileLoading || applicationsLoading || jobsLoading;

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Willkommen{profile?.name ? `, ${profile.name}` : ' zurück'}
      </h2>
      
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
                <p className="text-2xl font-bold">{profileCompleteness}%</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
              <div className="rounded-full bg-green-100 p-2">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Bewerbungen</p>
                <p className="text-2xl font-bold">{applications?.length || 0}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-md">
              <div className="rounded-full bg-amber-100 p-2">
                <Eye className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Profilaufrufe</p>
                <p className="text-2xl font-bold">{getProfileViews()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="applications" className="mb-6">
        <TabsList>
          <TabsTrigger value="applications">Bewerbungen</TabsTrigger>
          <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
          <TabsTrigger value="profile">Profil Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <Card>
            <CardContent className="pt-6">
              {applications && applications.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg mb-4">Deine Bewerbungen ({applications.length})</h3>
                  {applications.slice(0, 3).map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{application.job?.title || 'Stellenanzeige'}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{application.job?.location || 'Ort nicht angegeben'}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Beworben am {new Date(application.created_at).toLocaleDateString('de-DE')}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            application.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {application.status === 'new' ? 'Neu' :
                             application.status === 'reviewed' ? 'In Bearbeitung' :
                             application.status === 'accepted' ? 'Angenommen' :
                             application.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {applications.length > 3 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/talent/applications">
                        Alle {applications.length} Bewerbungen anzeigen
                      </Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col py-8 text-center">
                  <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Keine Bewerbungen vorhanden</h3>
                  <p className="text-gray-500 mb-4 max-w-md">
                    Du hast dich noch nicht beworben. Finde passende Projekte in der Erkunden-Sektion.
                  </p>
                  <Button className="flex items-center" asChild>
                    <Link to="/talent/erkunden">
                      Projekte erkunden <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardContent className="pt-6">
              {availableJobs && availableJobs.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg mb-4">Empfohlene Stellen für dich</h3>
                  {availableJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{job.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {job.hourly_rate_min !== '0' || job.hourly_rate_max !== '0' ? (
                              <span className="font-medium">
                                {job.hourly_rate_min === job.hourly_rate_max 
                                  ? `${job.hourly_rate_min}€/Std` 
                                  : `${job.hourly_rate_min}€-${job.hourly_rate_max}€/Std`}
                              </span>
                            ) : (
                              <span className="font-medium">Nach Vereinbarung</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button size="sm" asChild>
                            <Link to={`/jobs/${job.id}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/talent/erkunden">
                      Alle verfügbaren Stellen anzeigen
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col py-8 text-center">
                  <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <BookOpen className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Keine Empfehlungen verfügbar</h3>
                  <p className="text-gray-500 mb-4 max-w-md">
                    Vervollständige dein Profil, um passende Empfehlungen zu erhalten.
                  </p>
                  <Button className="flex items-center" asChild>
                    <Link to="/talent/profil">
                      Profil bearbeiten <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">Profil Vervollständigung</h3>
                  <span className="text-2xl font-bold text-gitflash-primary">{profileCompleteness}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gitflash-primary h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${profileCompleteness}%` }}
                  ></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${talentProfile?.headline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={talentProfile?.headline ? 'text-green-700' : 'text-gray-500'}>
                      Headline hinzugefügt
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${talentProfile?.summary ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={talentProfile?.summary ? 'text-green-700' : 'text-gray-500'}>
                      Zusammenfassung hinzugefügt
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${talentProfile?.skills ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={talentProfile?.skills ? 'text-green-700' : 'text-gray-500'}>
                      Skills hinzugefügt
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${talentProfile?.cv_url ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={talentProfile?.cv_url ? 'text-green-700' : 'text-gray-500'}>
                      Lebenslauf hochgeladen
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${talentProfile?.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className={talentProfile?.status === 'approved' ? 'text-green-700' : 'text-yellow-600'}>
                      {talentProfile?.status === 'approved' ? 'Profil genehmigt' : 
                       talentProfile?.status === 'submitted' ? 'Profil eingereicht' : 'Profil in Bearbeitung'}
                    </span>
                  </div>
                </div>
                
                <Button className="w-full mt-6" asChild>
                  <Link to="/talent/profil">
                    Profil bearbeiten
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentStartseitePanel;
