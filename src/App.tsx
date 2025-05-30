import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthContextProvider } from '@/context/AuthContext';

import IndexPage from '@/pages/IndexPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import JobsPage from '@/pages/JobsPage';
import JobDetailPage from '@/pages/JobDetailPage';
import JobApplicationPage from '@/pages/JobApplicationPage';

import TalentDashboardPage from '@/pages/talent/TalentDashboardPage';
import TalentProfilePage from '@/pages/talent/TalentProfilePage';
import TalentInterviewsPage from '@/pages/talent/TalentInterviewsPage';
import TalentApplicationsPage from '@/pages/talent/ApplicationsPage';

import UnternehmenDashboardPage from '@/pages/unternehmen/UnternehmenDashboardPage';
import JobCreatePage from '@/pages/unternehmen/JobCreatePage';
import JobAnzeigeDetailPage from '@/pages/unternehmen/JobAnzeigeDetailPage';
import ApplicationsPage from '@/pages/unternehmen/ApplicationsPage';
import UnternehmenInterviewsPage from '@/pages/unternehmen/UnternehmenInterviewsPage';
import InterviewCreatePage from '@/pages/unternehmen/InterviewCreatePage';
import ZahlungenPage from '@/pages/unternehmen/ZahlungenPage';
import TeamPage from '@/pages/unternehmen/TeamPage';

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminJobsPage from '@/pages/admin/AdminJobsPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminPaymentsPage from '@/pages/admin/AdminPaymentsPage';

import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCancelPage from '@/pages/PaymentCancelPage';

import InterviewPage from '@/pages/InterviewPage';

import JobEditPage from '@/pages/unternehmen/JobEditPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/jobs/:id/apply" element={<JobApplicationPage />} />
            
            {/* Talent routes */}
            <Route path="/talent" element={<TalentDashboardPage />} />
            <Route path="/talent/profile" element={<TalentProfilePage />} />
            <Route path="/talent/interviews" element={<TalentInterviewsPage />} />
            <Route path="/talent/applications" element={<TalentApplicationsPage />} />
            
            {/* Company routes */}
            <Route path="/unternehmen" element={<UnternehmenDashboardPage />} />
            <Route path="/unternehmen/jobs" element={<JobsPage />} />
            <Route path="/unternehmen/jobs/neu" element={<JobCreatePage />} />
            <Route path="/unternehmen/jobs/bearbeiten/:id" element={<JobEditPage />} />
            <Route path="/unternehmen/jobanzeigen/:id" element={<JobAnzeigeDetailPage />} />
            <Route path="/unternehmen/bewerbungen" element={<ApplicationsPage />} />
            <Route path="/unternehmen/interviews" element={<UnternehmenInterviewsPage />} />
            <Route path="/unternehmen/interviews/erstellen" element={<InterviewCreatePage />} />
            <Route path="/unternehmen/zahlungen" element={<ZahlungenPage />} />
            <Route path="/unternehmen/team" element={<TeamPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/jobs" element={<AdminJobsPage />} />
            <Route path="/admin/benutzer" element={<AdminUsersPage />} />
            <Route path="/admin/zahlungen" element={<AdminPaymentsPage />} />
            
            {/* Payment routes */}
            <Route path="/zahlung/erfolgreich" element={<PaymentSuccessPage />} />
            <Route path="/zahlung/abgebrochen" element={<PaymentCancelPage />} />
            
            {/* Interview routes */}
            <Route path="/interview/:sessionId" element={<InterviewPage />} />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
