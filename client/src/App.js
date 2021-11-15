import './App.css';
import {
  BrowserRouter as Router,
  Navigate as Redirect,
  Routes,
  Route,
} from "react-router-dom";
import { AppBar } from './components';

import { 
  Main, 
  Play, 
  Ranking,
  Signin,
  Signup
 } from './pages';

const App = () => {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/play" element={<Play />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Redirect to="/" />} />
      </Routes>
    </Router>
  );
};


export default App;
