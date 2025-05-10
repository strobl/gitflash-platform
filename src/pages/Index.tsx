
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { isAuthenticated, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gitflash-primary">GitFlash</h1>
          <div className="space-x-4">
            {!isAuthenticated ? (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gitflash-primary text-white rounded-md hover:bg-gitflash-primary/90 transition-colors"
              >
                Login
              </Link>
            ) : (
              <>
                {profile?.role === 'user' && (
                  <Link 
                    to="/talent" 
                    className="px-4 py-2 bg-gitflash-primary text-white rounded-md hover:bg-gitflash-primary/90 transition-colors"
                  >
                    Talent Dashboard
                  </Link>
                )}
                {profile?.role === 'business' && (
                  <Link 
                    to="/unternehmen" 
                    className="px-4 py-2 bg-gitflash-primary text-white rounded-md hover:bg-gitflash-primary/90 transition-colors"
                  >
                    Unternehmens Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Willkommen bei GitFlash
          </h1>
          <p className="text-xl mb-10 text-gray-600">
            Die Plattform, die Talente und Unternehmen in der Baubranche verbindet.
          </p>

          {!isAuthenticated ? (
            <Link 
              to="/login" 
              className="px-6 py-3 bg-gitflash-primary text-white rounded-md text-lg hover:bg-gitflash-primary/90 transition-colors"
            >
              Jetzt starten
            </Link>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Eingeloggt als: {profile?.role === 'user' ? 'Talent' : 'Unternehmen'}</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {profile?.role === 'user' && (
                  <Link 
                    to="/talent" 
                    className="px-6 py-3 bg-gitflash-primary text-white rounded-md text-lg hover:bg-gitflash-primary/90 transition-colors"
                  >
                    Zum Talent Dashboard
                  </Link>
                )}
                {profile?.role === 'business' && (
                  <Link 
                    to="/unternehmen" 
                    className="px-6 py-3 bg-gitflash-primary text-white rounded-md text-lg hover:bg-gitflash-primary/90 transition-colors"
                  >
                    Zum Unternehmens Dashboard
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="container mx-auto py-6 px-4">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <Link to="/impressum" className="hover:text-gitflash-primary">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-gitflash-primary">Datenschutz</Link>
          <Link to="/agb" className="hover:text-gitflash-primary">AGB</Link>
        </div>
      </footer>
    </div>
  );
}
