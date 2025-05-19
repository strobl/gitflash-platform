
import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Anmelden bei GitFlash
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Oder{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              erstellen Sie ein neues Konto
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <p className="text-center">Login-Formular kommt hier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
