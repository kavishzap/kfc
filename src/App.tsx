import Logo from "./assets/pos.png";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import System from "./System";

function App() {
  const appStyle = {
    backgroundImage: "radial-gradient(circle, #000 -2px, transparent 2px)",
    backgroundSize: "20px 20px", // Controls the spacing between dots
  };

  return (
    <div style={appStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/system" element={<System />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
