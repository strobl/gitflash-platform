
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { PaymentHistory } from '@/components/payments/PaymentHistory';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const CompanyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    toast.error('Sie müssen angemeldet sein, um auf diese Seite zuzugreifen');
    navigate('/login');
    return null;
  }

  const handleCreateJob = () => {
    navigate('/unternehmen/create-job');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Unternehmen Dashboard</h1>
        <p className="text-gray-600 mb-6">Verwalten Sie Ihre Jobs und sehen Sie Zahlungen ein.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Jobs verwalten</h2>
                <Button onClick={handleCreateJob} className="flex items-center">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Job erstellen
                </Button>
              </div>
              <p className="text-gray-600 mb-4">Erstellen und verwalten Sie Ihre Stellenangebote</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-1">Aktive Jobs</h3>
                  <p className="text-gray-600">Sehen Sie Ihre aktuellen Ausschreibungen ein</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => navigate('/unternehmen/jobs')}
                  >
                    Ansehen
                  </Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-1">Interviews erstellen</h3>
                  <p className="text-gray-600">Erstellen Sie personalisierte Interview-Szenarien</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => navigate('/create-interview')}
                  >
                    Interview erstellen
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-medium mb-4">Talente entdecken</h2>
              <p className="text-gray-600 mb-4">Durchsuchen Sie unsere Datenbank von qualifizierten Fachkräften</p>
              <Button onClick={() => navigate('/unternehmen/suche')}>
                Talente suchen
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <PaymentHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
