
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { UnternehmenNavigation } from '@/components/unternehmen/UnternehmenNavigation';
import { ApplicationsList } from '@/components/applications/ApplicationsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
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
                      <p className="text-2xl font-semibold text-blue-600">12</p>
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
                      <p className="text-2xl font-semibold text-yellow-600">5</p>
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
                      <p className="text-2xl font-semibold text-green-600">8</p>
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
                      <p className="text-2xl font-semibold text-red-600">15</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Applications List */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Alle Bewerbungen</TabsTrigger>
                <TabsTrigger value="new">Neue</TabsTrigger>
                <TabsTrigger value="reviewing">In Bearbeitung</TabsTrigger>
                <TabsTrigger value="interview">Vorstellungsgespräch</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ApplicationsList type="business" />
              </TabsContent>

              <TabsContent value="new">
                <ApplicationsList type="business" />
              </TabsContent>

              <TabsContent value="reviewing">
                <ApplicationsList type="business" />
              </TabsContent>

              <TabsContent value="interview">
                <ApplicationsList type="business" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
