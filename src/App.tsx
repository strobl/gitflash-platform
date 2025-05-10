
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
// Neue Importe für den Unternehmensbereich
import { UnternehmenLayout } from "./components/unternehmen/UnternehmenLayout";
import UnternehmenIndexPage from "./pages/unternehmen/IndexPage";
import JobsPage from "./pages/unternehmen/JobsPage";
import CreateJobPage from "./pages/unternehmen/CreateJobPage";
import TeamPage from "./pages/unternehmen/TeamPage";
import SuchePage from "./pages/unternehmen/SuchePage";
import AusgabenPage from "./pages/unternehmen/AusgabenPage";
import TalentProfilPage from "./pages/unternehmen/TalentProfilPage";

const queryClient = new QueryClient();

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
              <Route path="/uebung/:id" element={<Uebung />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<Agb />} />
              <Route path="/talent" element={<TalentPage />} />
              
              {/* Neue Routen für den Unternehmensbereich */}
              <Route path="/unternehmen" element={<UnternehmenLayout />}>
                <Route index element={<UnternehmenIndexPage />} />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="jobs/neu" element={<CreateJobPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="suche" element={<SuchePage />} />
                <Route path="ausgaben" element={<AusgabenPage />} />
                <Route path="talent/:id" element={<TalentProfilPage />} />
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
