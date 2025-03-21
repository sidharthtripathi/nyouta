import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTemplate from "./pages/templates/NewTemplate";
import TemplatePricing from "./components/TemplatePricing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-template/template01" element={<NewTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
