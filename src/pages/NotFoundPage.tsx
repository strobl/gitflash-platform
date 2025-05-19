
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Seite nicht gefunden</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
