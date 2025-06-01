
import React from 'react';
import { UnifiedNavbar } from '@/components/navigation/UnifiedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { ApplicationsFilter } from '@/components/applications/ApplicationsFilter';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApplicationsWithStats } from '@/hooks/useApplicationsWithStats';

export default function ApplicationsPage() {
  const { stats, loading } = useApplicationsWithStats();

  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedNavbar />
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Bewerbungen</h1>
              <p className="text-gray-600 mt-1">Verwalten Sie alle Bewerbungen für Ihre Stellenausschreibungen</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Neue Bewerbungen</p>
                      <p className="text-2xl font-semibold text-blue-600">
                        {loading ? '...' : stats.new}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Bearbeitung</p>
                      <p className="text-2xl font-semibold text-yellow-600">
                        {loading ? '...' : stats.reviewing + stats.interview}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Eingestellt</p>
                      <p className="text-2xl font-semibold text-green-600">
                        {loading ? '...' : stats.hired}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Abgelehnt</p>
                      <p className="text-2xl font-semibold text-red-600">
                        {loading ? '...' : stats.rejected}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Applications List with Filters */}
            <ApplicationsFilter type="business" stats={stats} />
          </div>
        </main>
      </div>
    </div>
  );
}
