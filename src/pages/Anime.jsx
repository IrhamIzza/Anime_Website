import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // pastikan ini diimpor

export default function Anime() {
  const [anime, setAnime] = useState([]);
  const [anime2, setAnime2] = useState([]);
  const [anime3, setAnime3] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true);

      // fetch 3 data sekaligus
      const [res1, res2, res3] = await Promise.all([
        fetch("https://api.jikan.moe/v4/top/anime?limit=5"),
        fetch("https://api.jikan.moe/v4/top/anime?limit=5&filter=bypopularity"),
        fetch("https://api.jikan.moe/v4/top/anime?limit=5&filter=upcoming"),
      ]);

      const [data1, data2, data3] = await Promise.all([
        res1.json(),
        res2.json(),
        res3.json(),
      ]);

      // set state
      setAnime(data1.data);
      setAnime2(data2.data);
      setAnime3(data3.data);
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
        {/* Top Anime */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Top Anime</h3>
            <Link to="/anime/trending">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All
              </h3>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
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

        {/* Popular Anime */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Popular Anime</h3>
            <Link to="/anime/popular">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All
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

        {/* Upcoming Anime */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-6">🔥 Upcoming Anime</h3>
            <Link to="/anime/upcoming">
              <h3 className="text-md text-gray-400 font-semibold mb-6 hover:text-white transition">
                View All
              </h3>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {anime3.map((item) => (
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
