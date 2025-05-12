
import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/context/AuthContext';
import { CameraProvider } from '@/context/CameraContext';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Login2 from "./pages/Login2";
import Profile from "./pages/Profile";
import InterviewsDesign from "./pages/InterviewsDesign"; 
import CreateInterview from "./pages/CreateInterview";
import InterviewDetail from "./pages/InterviewDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Uebung from "./pages/Uebung";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Agb from "./pages/Agb";
import TalentPage from "./pages/TalentPage";
import { UnternehmenLayout } from "./components/unternehmen/UnternehmenLayout";
import UnternehmenJobsPage from "./pages/unternehmen/UnternehmenJobsPage";
import UnternehmenTeamPage from "./pages/unternehmen/UnternehmenTeamPage";
import UnternehmenAusgabenPage from "./pages/unternehmen/UnternehmenAusgabenPage";
import UnternehmenSuchePage from "./pages/unternehmen/UnternehmenSuchePage";
import CreateJobPage from "./pages/unternehmen/CreateJobPage";
import UnternehmenTalentPage from "./pages/unternehmen/UnternehmenTalentPage";
import JobAnzeigeDetailPage from "./pages/unternehmen/JobAnzeigeDetailPage";
import TalentProfilPage from "./pages/talent/profil";
import TalentStartseitePage from "./pages/talent/startseite";
import TalentInterviewPage from "./pages/talent/interview";
import TalentErkundenPage from "./pages/talent/erkunden";
import TalentZahlungenPage from "./pages/talent/zahlungen";
import AdminProfilesListPage from "./pages/admin/profiles/index";
import AdminProfileDetailPage from "./pages/admin/profiles/[id]";
import AdminSearchPage from "./pages/admin/profiles/search";
import PublicJobsPage from "./pages/PublicJobsPage";
import PublicJobDetailPage from "./pages/PublicJobDetailPage";
import JobApprovalPage from "./pages/admin/JobApprovalPage";

const queryClient = new QueryClient();

const JobsPage = lazy(() => import('./pages/unternehmen/JobsPage'));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CameraProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login2" element={<Login2 />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/interviews" element={<InterviewsDesign />} />
              <Route path="/interviews/create" element={<CreateInterview />} />
              <Route path="/interviews/:id" element={<InterviewDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* Public Job Routes */}
              <Route path="/jobs" element={<PublicJobsPage />} />
              <Route path="/jobs/:id" element={<PublicJobDetailPage />} />
              
              {/* Admin Profile Routes */}
              <Route path="/admin/profiles" element={<AdminProfilesListPage />} />
              <Route path="/admin/profiles/:id" element={<AdminProfileDetailPage />} />
              <Route path="/admin/profiles/search" element={<AdminSearchPage />} />
              <Route path="/admin/jobs/approval" element={<JobApprovalPage />} />
              
              <Route path="/uebung/:id" element={<Uebung />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<Agb />} />
              
              {/* Talent routes */}
              <Route path="/talent" element={<TalentPage />} />
              <Route path="/talent/startseite" element={<TalentStartseitePage />} />
              <Route path="/talent/profil" element={<TalentProfilPage />} />
              <Route path="/talent/interview" element={<TalentInterviewPage />} />
              <Route path="/talent/erkunden" element={<TalentErkundenPage />} />
              <Route path="/talent/zahlungen" element={<TalentZahlungenPage />} />
              
              {/* Unternehmen routes - here's the fix: the Layout is the element, and its children are nested inside */}
              <Route path="/unternehmen" element={<UnternehmenLayout />}>
                <Route index element={<UnternehmenJobsPage />} />
                <Route path="team" element={<UnternehmenTeamPage />} />
                <Route path="ausgaben" element={<UnternehmenAusgabenPage />} />
                <Route path="suche" element={<UnternehmenSuchePage />} />
                <Route path="jobs/neu" element={<CreateJobPage />} />
                <Route path="talent/:id" element={<UnternehmenTalentPage />} />
                <Route path="jobanzeigen/:id" element={<JobAnzeigeDetailPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CameraProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
