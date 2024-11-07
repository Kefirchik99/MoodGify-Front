import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { MoodProvider } from './providers/MoodContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './services/firebaseAuth';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <MoodProvider>

        <App />

      </MoodProvider>
    </BrowserRouter>
  </AuthProvider>
);
