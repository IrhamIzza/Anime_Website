import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // pastikan ini diimpor

export default function Manga() {
  const [manga, setManga] = useState([]);
  const [manga2, setManga2] = useState([]);
  const [manga3, setManga3] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);
  async function getData() {
    try {
      setLoading(true);

      // fetch 3 data sekaligus
      const [res1, res2, res3] = await Promise.all([
        fetch("https://api.jikan.moe/v4/top/manga?limit=5"),
        fetch("https://api.jikan.moe/v4/top/manga?limit=5&filter=bypopularity"),
        fetch("https://api.jikan.moe/v4/top/manga?limit=5&filter=upcoming"),
      ]);

      const [data1, data2, data3] = await Promise.all([
        res1.json(),
        res2.json(),
        res3.json(),
      ]);

      // set state
      setManga(data1.data);
      setManga2(data2.data);
      setManga3(data3.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    try {
      setSearching(true);
      const res = await fetch(
        `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(
          search
        )}&limit=10`
      );
      const data = await res.json();
      setSearchResult(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Loader */}
      <div className="bg-gray-900 text-white md:px-20 pt-2">
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <i className="ph ph-circle-notch animate-spin text-6xl text-white"></i>
          </div>
        )}
        {/*Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex gap-3 items-center px-6 mt-6"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search manga..."
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 pr-10
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {search.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchResult([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
          >
            Search
          </button>
        </form>

        {/* Hasil Search */}
        {searchResult.length > 0 && (
          <section className="px-6 pb-10 py-6">
            {/* loading */}
            {searching ? (
              <div className="flex justify-center items-center py-10">
                <i className="ph ph-circle-notch animate-spin text-5xl text-white"></i>
              </div>
            ) : (
              // result
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {searchResult.map((item) => (
                  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
                    <Link to={`/manga/detail/${item.mal_id}`} key={item.mal_id}>
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
            )}
          </section>
        )}
        
        {searchResult.length === 0 && (
          <div>
            {/* Top Manga */}
            <section className="px-6 py-10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold mb-6">🔥 Top Manga</h3>
                <Link to="/manga/trending">
                  <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                    View All
                  </h3>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {manga.map((item) => (
                  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
                    <Link to={`/manga/detail/${item.mal_id}`} key={item.mal_id}>
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

            {/* Popular Manga */}
            <section className="px-6 py-10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold mb-6">
                  🔥 Popular Manga
                </h3>
                <Link to="/manga/popular">
                  <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                    View All
                  </h3>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {manga2.map((item) => (
                  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
                    <Link to={`/manga/detail/${item.mal_id}`} key={item.mal_id}>
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

            {/* Upcoming Manga */}
            <section className="px-6 py-10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold mb-6">
                  🔥 Upcoming Manga
                </h3>
                <Link to="/manga/upcoming">
                  <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                    View All
                  </h3>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {manga3.map((item) => (
                  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
                    <Link to={`/manga/detail/${item.mal_id}`} key={item.mal_id}>
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
        )}
      </div>
    </>
  );
}
