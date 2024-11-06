import './App.scss'
import './styles/main.scss';
import Header from './Header'
import "@blueprintjs/core/lib/css/blueprint.css";
// import Container from 'react-bootstrap/Container';
// import Header from './Header';
import Body from './Body/Body';
// import Footer from './Footer';
import CookieConsentAlert from './Body/Cookies/CookieConsentAlert'
import { NotificationsProvider } from './providers/NotifContext'


function App() {

  return (
    <div className='app-container'>
      <NotificationsProvider>
        <Header />
        <CookieConsentAlert />
        <Body />
        {/* <Footer /> */}
      </NotificationsProvider>
    </div>
  );
}

export default App;