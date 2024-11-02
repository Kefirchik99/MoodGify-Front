import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { MoodProvider } from './providers/MoodContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MoodProvider>
      <App />
    </MoodProvider>
  </BrowserRouter>
);
