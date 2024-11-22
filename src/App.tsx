import Logo from "./assets/pos.png";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import System from "./System";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login logo={Logo} illustration="/illustration.png" />}
        />
        <Route path="/system" element={<System />} />
      </Routes>
    </Router>
  );
}

export default App;
