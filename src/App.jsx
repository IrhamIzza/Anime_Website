import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Anime from "./pages/Anime";

function App() {
  return (
    <>
    <Navbar>
    </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
      </Routes>
    </>
  );
}

export default App