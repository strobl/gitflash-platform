
import React from 'react';
import { TalentLayout } from '@/components/talent/TalentLayout';
import { useApplications } from '@/hooks/useApplications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ExternalLink, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TalentApplicationsPage() {
  const { data: applications, isLoading, error } = useApplications({ type: 'talent' });

  if (isLoading) {
    return (
      <TalentLayout activeTab="applications">
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </TalentLayout>
    );
  }

  if (error) {
    return (
      <TalentLayout activeTab="applications">
        <div className="text-center py-12">
          <p className="text-red-600">Fehler beim Laden der Bewerbungen</p>
        </div>
      </TalentLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Neu';
      case 'reviewed': return 'In Bearbeitung';
      case 'accepted': return 'Angenommen';
      case 'rejected': return 'Abgelehnt';
      default: return status;
    }
  };

  return (
    <TalentLayout activeTab="applications">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Meine Bewerbungen</h1>
          <p className="text-gray-500">Überblick über alle eingereichten Bewerbungen</p>
        </div>

        {applications && applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {application.job?.title || 'Stellenanzeige'}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{application.job?.location || 'Ort nicht angegeben'}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Beworben am {new Date(application.created_at).toLocaleDateString('de-DE')}</span>
                    </div>
                    
                    {application.job?.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {application.job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-sm">
                        {application.job?.hourly_rate_min !== '0' || application.job?.hourly_rate_max !== '0' ? (
                          <span className="font-medium">
                            {application.job?.hourly_rate_min === application.job?.hourly_rate_max 
                              ? `${application.job?.hourly_rate_min}€/Std` 
                              : `${application.job?.hourly_rate_min}€-${application.job?.hourly_rate_max}€/Std`}
                          </span>
                        ) : (
                          <span className="font-medium">Nach Vereinbarung</span>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/jobs/${application.job?.id}`}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-2">Keine Bewerbungen vorhanden</h3>
                <p className="text-gray-500 mb-6">
                  Du hast dich noch nicht beworben. Entdecke interessante Projekte und sende deine erste Bewerbung.
                </p>
                <Button asChild>
                  <Link to="/talent/erkunden">
                    Projekte erkunden
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TalentLayout>
  );
}
