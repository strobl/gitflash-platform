
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext';
import { CameraProvider } from '@/context/CameraContext';

// Landing page
import Index from '@/pages/Index';

// Auth pages
import Login from '@/pages/Login';
import Login2 from '@/pages/Login2';

// Dashboard pages
import Dashboard from '@/pages/Dashboard';

// Profile pages
import Profile from '@/pages/Profile';

// Interview pages
import InterviewsDesign from '@/pages/InterviewsDesign';
import CreateInterview from '@/pages/CreateInterview';
import Uebung from '@/pages/Uebung';

// Talent pages
import TalentPage from '@/pages/TalentPage';
import TalentApplicationsPage from '@/pages/talent/ApplicationsPage';

// Public pages
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';

// Unternehmen pages
import UnternehmenDashboardPage from '@/pages/unternehmen/UnternehmenDashboardPage';
import UnternehmenTeamPage from '@/pages/unternehmen/UnternehmenTeamPage';
import UnternehmenSuchePage from '@/pages/unternehmen/UnternehmenSuchePage';
import UnternehmenAusgabenPage from '@/pages/unternehmen/UnternehmenAusgabenPage';
import CreateJobPage from '@/pages/unternehmen/CreateJobPage';
import JobAnzeigeDetailPage from '@/pages/unternehmen/JobAnzeigeDetailPage';
import JobEditPage from '@/pages/unternehmen/JobEditPage';

// Payment pages
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCanceledPage from '@/pages/PaymentCanceledPage';

// Legal pages
import Impressum from '@/pages/Impressum';

// Admin pages
import AdminDashboard from '@/pages/AdminDashboard';

// 404 page
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CameraProvider>
          <Router>
            <Routes>
              {/* Landing page */}
              <Route path="/" element={<Index />} />
              
              {/* Public pages */}
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/login2" element={<Login2 />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Profile routes */}
              <Route path="/profile" element={<Profile />} />
              
              {/* Interview routes */}
              <Route path="/interviews" element={<InterviewsDesign />} />
              <Route path="/interviews/create" element={<CreateInterview />} />
              <Route path="/uebung/:id" element={<Uebung />} />
              
              {/* Talent routes */}
              <Route path="/talent" element={<TalentPage />} />
              <Route path="/talent/applications" element={<TalentApplicationsPage />} />
              
              {/* Unternehmen routes */}
              <Route path="/unternehmen" element={<UnternehmenDashboardPage />} />
              <Route path="/unternehmen/team" element={<UnternehmenTeamPage />} />
              <Route path="/unternehmen/suche" element={<UnternehmenSuchePage />} />
              <Route path="/unternehmen/ausgaben" element={<UnternehmenAusgabenPage />} />
              <Route path="/unternehmen/jobs/neu" element={<CreateJobPage />} />
              <Route path="/unternehmen/jobanzeigen/:id" element={<JobAnzeigeDetailPage />} />
              <Route path="/unternehmen/jobs/bearbeiten/:id" element={<JobEditPage />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Payment routes */}
              <Route path="/zahlung/erfolgreich" element={<PaymentSuccessPage />} />
              <Route path="/zahlung/abgebrochen" element={<PaymentCanceledPage />} />
              
              {/* Legal routes */}
              <Route path="/impressum" element={<Impressum />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </CameraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
