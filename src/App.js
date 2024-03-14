import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import logo from './images/logo.svg';
import './App.css';
import Map from './components/Map';
import Menu from './components/Menu';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map/>} />
      </Routes>
    </Router>
  );
}

export default App;