import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeartbeatProvider } from "./lib/heartbeat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Stories from "./pages/Stories";
import News from "./pages/News";
import Advancement from "./pages/Advancement";

export default function App() {
  return (
    <BrowserRouter>
      <HeartbeatProvider>
        <div className="film-grain" aria-hidden="true" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/news" element={<News />} />
          <Route path="/advancement" element={<Advancement />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </HeartbeatProvider>
    </BrowserRouter>
  );
}
