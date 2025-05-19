
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unternehmen" element={<CompanyPage />} />
        <Route path="/unternehmen/job-erstellen" element={<UnternehmenJobErstellenPage />} />
        <Route path="/unternehmen/create-job" element={<CreateJobPage />} />
        <Route path="/create-interview" element={<CreateInterview />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
