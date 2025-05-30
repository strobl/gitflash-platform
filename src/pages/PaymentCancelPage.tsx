
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Zahlung abgebrochen</h1>
        <p className="mb-6">Ihre Zahlung wurde abgebrochen.</p>
        <Button asChild>
          <Link to="/">Zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
}
