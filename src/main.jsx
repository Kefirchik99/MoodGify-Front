import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { MoodProvider } from './providers/MoodContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/authContext';
import { NotificationsProvider } from './providers/NotificationsContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MoodProvider>
      <AuthProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </AuthProvider>
    </MoodProvider>
  </BrowserRouter>
);
