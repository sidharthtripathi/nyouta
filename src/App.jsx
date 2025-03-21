import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Template01 from "./pages/templates/Template01";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-template/template01" element={<Template01 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
