
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';

export default function PaymentCanceledPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <main className="flex-1 container mx-auto max-w-4xl py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <Alert className="bg-amber-50 border-amber-200 mb-8">
            <XCircle className="h-6 w-6 text-amber-600" />
            <AlertTitle className="text-amber-800 text-xl font-semibold ml-2">
              Zahlung abgebrochen
            </AlertTitle>
            <AlertDescription className="ml-8 text-amber-700">
              Die Zahlung wurde abgebrochen. Ihre Jobanzeige wurde nicht veröffentlicht.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <p className="text-gray-600">
              Sie können jederzeit zurückkehren und den Zahlungsvorgang erneut starten, um Ihre Jobanzeige zu veröffentlichen.
            </p>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-8">
              <Button asChild className="flex-1">
                <Link to="/unternehmen/jobs">
                  Zurück zur Übersicht
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/unternehmen/jobs/neu">
                  Neue Jobanzeige erstellen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
