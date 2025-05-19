
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { CameraProvider } from './context/CameraContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CameraProvider>
      <App />
    </CameraProvider>
  </AuthProvider>
);
