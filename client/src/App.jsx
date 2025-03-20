import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WeddingWebsitUrl from "./pages/WeddingWebsitUrl";
import AuthCheck from './components/AuthCheck';
import LoginRegister from './pages/LoginRegister';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/wedding-website" element={
          <AuthCheck>
            <WeddingWebsitUrl />
          </AuthCheck>
        } />
      

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
