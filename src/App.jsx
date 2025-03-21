import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTemplate from "./pages/templates/NewTemplate";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-template/template01" element={<NewTemplate />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
