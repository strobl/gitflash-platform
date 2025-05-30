
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext';

import TalentApplicationsPage from '@/pages/talent/ApplicationsPage';
import UnternehmenDashboardPage from '@/pages/unternehmen/UnternehmenDashboardPage';
import JobAnzeigeDetailPage from '@/pages/unternehmen/JobAnzeigeDetailPage';
import JobEditPage from '@/pages/unternehmen/JobEditPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Unternehmen routes */}
            <Route path="/unternehmen" element={<UnternehmenDashboardPage />} />
            <Route path="/unternehmen/jobanzeigen/:id" element={<JobAnzeigeDetailPage />} />
            <Route path="/unternehmen/jobs/bearbeiten/:id" element={<JobEditPage />} />
            
            {/* Talent routes */}
            <Route path="/talent/applications" element={<TalentApplicationsPage />} />
            
            {/* Payment routes */}
            <Route path="/zahlung/erfolgreich" element={<PaymentSuccessPage />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/unternehmen" replace />} />
            <Route path="*" element={<Navigate to="/unternehmen" replace />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
