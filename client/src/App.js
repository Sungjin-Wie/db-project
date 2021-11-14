import './App.css';
import {
  HashRouter as Router,
  Navigate as Redirect,
  Routes,
  Route,
} from "react-router-dom";

import { Temp, Play } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/play" element={<Play />} />
        <Route path="/*" element={<Redirect to="/" />} />
      </Routes>
    </Router>
  );
};


export default App;
