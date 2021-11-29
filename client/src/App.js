import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { AppBar } from "./components";

import { Game, Main, Play, Ranking, Signin, Signup } from "./pages";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  width: window.innerWidth >= 900 ? "900px" : "400px",
  margin: "auto",
});

const App = () => {
  return (
    <Router>
      <AppBar />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/play" element={<Play />} />
          <Route path="/game" element={<Game />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
