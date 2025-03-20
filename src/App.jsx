import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTemplate from "./pages/templates/NewTemplate";
import TemplatePricing from "./components/TemplatePricing";
import YoutubeEmbed from "./components/YoutubeEmbed";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
