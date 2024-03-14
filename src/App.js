import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './images/logo.svg';
import './App.css';
import Map from './components/Map';
import Menu from './components/Menu';

function App() {
  return (
    <div>
      <Menu/>
      <Map/>
    </div>
  );
}

export default App;