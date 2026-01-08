import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import AnimeList from "./pages/AnimeList";
import MangaList from "./pages/MangaList";
import Manga from "./pages/Manga";
import DetailAnime from "./pages/DetailAnime";
import DetailManga from "./pages/DetailManga";

function App() {
  return (
    <>
    <Navbar>
    </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/anime/:type" element={<AnimeList />} />
        <Route path="/manga/:type" element={<MangaList />} />
        <Route path="/anime/detail/:id" element={<DetailAnime />} />
        <Route path="/manga/detail/:id" element={<DetailManga />} />
      </Routes>
    </>
  );
}

export default App