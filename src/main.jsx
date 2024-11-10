import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { MoodProvider } from './providers/MoodContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './services/authContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MoodProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MoodProvider>
  </BrowserRouter>
);
