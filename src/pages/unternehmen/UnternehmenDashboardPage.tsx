
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UnifiedNavbar } from '@/components/navigation/UnifiedNavbar';
import { 
  Briefcase, 
  Users, 
  FileText, 
  Search, 
  Euro,
  Plus,
  TrendingUp,
  Clock
} from 'lucide-react';

const UnternehmenDashboardPage: React.FC = () => {
  const quickActions = [
    {
      title: 'Job erstellen',
      description: 'Neue Stellenausschreibung veröffentlichen',
      icon: Plus,
      href: '/unternehmen/jobs/neu',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Bewerbungen',
      description: 'Eingegangene Bewerbungen prüfen',
      icon: Briefcase,
      href: '/unternehmen/bewerbungen',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Verträge',
      description: 'Aktive Verträge verwalten',
      icon: FileText,
      href: '/unternehmen/vertraege',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Talent Suche',
      description: 'Passende Kandidaten finden',
      icon: Search,
      href: '/unternehmen/suche',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const stats = [
    {
      title: 'Neue Bewerbungen',
      value: '12',
      icon: Briefcase,
      trend: '+23%',
      color: 'text-blue-600'
    },
    {
      title: 'Aktive Verträge',
      value: '8',
      icon: FileText,
      trend: '+12%',
      color: 'text-green-600'
    },
    {
      title: 'Offene Stellen',
      value: '5',
      icon: Users,
      trend: '0%',
      color: 'text-purple-600'
    },
    {
      title: 'Monatliche Ausgaben',
      value: '€12.450',
      icon: Euro,
      trend: '+8%',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Unternehmen Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Verwalten Sie Ihre Bewerbungen, Verträge und finden Sie die besten Talente für Ihr Team
          </p>
        </div>

        {/* Statistiken */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                        {stat.trend} vs. letzter Monat
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={action.href}>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${action.color} text-white mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Neueste Aktivitäten */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Neueste Bewerbungen
              </CardTitle>
              <CardDescription>
                Die letzten eingegangenen Bewerbungen auf Ihre Stellenausschreibungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Max Mustermann</p>
                      <p className="text-sm text-gray-600">Bauleiter Hochbau</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">vor 2 Std.</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/unternehmen/bewerbungen">Alle Bewerbungen ansehen</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Übersicht
              </CardTitle>
              <CardDescription>
                Aktuelle Kennzahlen Ihrer Recruiting-Aktivitäten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bewerbungsrate</span>
                  <span className="font-medium">2.4 pro Tag</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Antwortzeit</span>
                  <span className="font-medium">4.2 Stunden</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Erfolgsquote</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aktive Jobs</span>
                  <span className="font-medium">5 Stellen</span>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/unternehmen/ausgaben">Detaillierte Statistiken</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UnternehmenDashboardPage;
