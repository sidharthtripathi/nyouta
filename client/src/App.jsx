import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTemplate from "./pages/templates/NewTemplate";
import TemplatePricing from "./components/TemplatePricing";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WeddingWebsitUrl from "./pages/WeddingWebsitUrl";
import AuthCheck from "./components/AuthCheck";
import LoginRegister from "./pages/LoginRegister";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/create-template/template01" element={<NewTemplate />} />
        <Route
          path="/wedding-website"
          element={
            <AuthCheck>
              <WeddingWebsitUrl />
            </AuthCheck>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
