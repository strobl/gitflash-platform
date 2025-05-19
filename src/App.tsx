import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CompanyPage from './pages/CompanyPage';
import UnternehmenJobErstellenPage from './pages/unternehmen/UnternehmenJobErstellenPage';
import CreateJobPage from './pages/unternehmen/CreateJobPage';
import CreateInterview from './pages/CreateInterview';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminPage from './pages/AdminPage';
import TalentPage from './pages/TalentPage';
import { UnternehmenLayout } from './components/unternehmen/UnternehmenLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        
        {/* Unternehmen routes */}
        <Route path="/unternehmen" element={<CompanyPage />} />
        <Route path="/unternehmen/job-erstellen" element={<UnternehmenJobErstellenPage />} />
        <Route path="/unternehmen/create-job" element={<CreateJobPage />} />
        <Route path="/unternehmen/suche" element={<UnternehmenLayout />} />
        <Route path="/unternehmen/team" element={<UnternehmenLayout />} />
        <Route path="/unternehmen/ausgaben" element={<UnternehmenLayout />} />
        <Route path="/unternehmen/jobs/neu" element={<UnternehmenLayout />} />
        
        {/* Talent routes */}
        <Route path="/talent" element={<TalentPage />} />
        <Route path="/talent/startseite" element={<TalentPage />} />
        <Route path="/talent/profil" element={<TalentPage />} />
        <Route path="/talent/interview" element={<TalentPage />} />
        <Route path="/talent/erkunden" element={<TalentPage />} />
        <Route path="/talent/zahlungen" element={<TalentPage />} />
        
        {/* Other routes */}
        <Route path="/create-interview" element={<CreateInterview />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
