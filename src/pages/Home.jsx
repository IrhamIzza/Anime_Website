import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [anime, setAnime] = useState([]);
  const [anime2, setAnime2] = useState([]);

  async function getData() {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=5");
    const data = await response.json();
    setAnime(data.data);
  }

  async function getData2() {
    const response = await fetch("https://api.jikan.moe/v4/top/manga?limit=5");
    const data = await response.json();
    setAnime2(data.data);
  }

  useEffect(() => {
    getData();
    getData2();
  }, []);

  return (
    <>
      <div className="bg-gray-900 text-white md:px-20 pt-2">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-purple-700 to-indigo-800 p-10 rounded-2xl mx-6">
          <h2 className="text-4xl font-bold mb-4">
            Discover Your Next Favorite Anime
          </h2>
          <p className="text-gray-200 max-w-lg">
            Track, explore, and enjoy the world of anime with a clean and modern
            UI.
          </p>
          <button className="mt-6 px-6 py-3 bg-purple-500 rounded-xl shadow-lg hover:bg-purple-400 transition">
            Browse Anime
          </button>
        </header>

        {/* Anime List */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Top Anime</h3>
            <Link to="/anime">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All{" "}
              </h3>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 ">
            {anime.map((item) => (
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
                <Link to={`/anime/detail/${item.mal_id}`} key={item.mal_id}>
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.status}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Top Manga List */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Top Manga</h3>
            <Link to="/manga">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All{" "}
              </h3>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {anime2.map((item) => (
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
                <Link to={`/anime/detail/${item.mal_id}`} key={item.mal_id}>
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.status}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
