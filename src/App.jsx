import './App.scss'
import './styles/main.scss';
import Header from './Header'
import "@blueprintjs/core/lib/css/blueprint.css";
// import Container from 'react-bootstrap/Container';
// import Header from './Header';
import Body from './Body/Body';
// import Footer from './Footer';


function App() {

  return (
    <div className='app-container'>
      <Header />
      <Body />
      {/* <Footer /> */}
    </div>
  );
}

export default App;