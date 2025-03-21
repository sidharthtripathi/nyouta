import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/Store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./pages/LoginRegister";
import WeddingWebsite from "./pages/WeddingWebsite";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Template01 from "./pages/templates/Template01";
function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="1050408168075-0orv0rlrn38457qe9p3hoh3sqdi3k29k.apps.googleusercontent.com">
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/register" element={<LoginRegister />} />
                <Route path="/wedding-website" element={<WeddingWebsite />} />
                <Route
                  path="/create-template/template01"
                  element={<Template01/>}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        <Toaster position="top-right" />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
