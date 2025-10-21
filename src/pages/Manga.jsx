import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // pastikan ini diimpor

export default function Manga() {
  const [manga, setManga] = useState([]);
  const [manga2, setManga2] = useState([]);
  const [manga3, setManga3] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <div
                key={item.mal_id} // ✅ pakai mal_id (bukan id)
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Manga */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Popular Manga</h3>
            <Link to="/manga/popular">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All
              </h3>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {manga2.map((item) => (
              <div
                key={item.mal_id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Manga */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Upcoming Manga</h3>
            <Link to="/manga/upcoming">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All
              </h3>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {manga3.map((item) => (
              <div
                key={item.mal_id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
