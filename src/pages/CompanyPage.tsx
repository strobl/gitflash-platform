
import React from 'react';
import { Link } from 'react-router-dom';

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Unternehmensbereich</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie Ihre Jobanzeigen und Kandidaten</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Jobanzeige erstellen</h3>
              <div className="mt-3">
                <Link
                  to="/unternehmen/job-erstellen"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Erstellen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
