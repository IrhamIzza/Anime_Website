import { useEffect, useState } from "react";

export default function Anime() {
  const [anime, setAnime] = useState([]);
  const [anime2, setAnime2] = useState([]);
  const [anime3, setAnime3] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true);
      const [res1, res2, res3] = await Promise.all([
        fetch("https://api.jikan.moe/v4/top/anime?limit=10"),
        fetch(
          "https://api.jikan.moe/v4/top/anime?limit=10&filter=bypopularity"
        ),
        fetch(
          "https://api.jikan.moe/v4/top/anime?limit=10&filter=upcoming"
        ),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();
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
      {loading && (
        <div className="bg-black h-full w-full fixed z-10 flex items-center justify-center opacity-85">
          <i className="ph ph-circle-notch animate-spin text-9xl text-white fixed z-20"></i>
        </div>
      )}
      <div className="bg-gray-900 text-white md:px-20 pt-2">
        {/* Anime List */}
        <section className="px-6 py-10">
          <h3 className="text-2xl font-semibold mb-6">🔥 Top Anime</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 ">
            {anime.map((anime) => (
              <div
                key={anime.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 ">
                  <h4 className="text-lg font-bold">{anime.title}</h4>
                  <p className="text-sm text-gray-400">{anime.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anime Popular */}
        <section className="px-6 py-10">
          <h3 className="text-2xl font-semibold mb-6">🔥 Popular Anime</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {anime2.map((anime) => (
              <div
                key={anime.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{anime.title}</h4>
                  <p className="text-sm text-gray-400">{anime.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anime Upcoming */}
        <section className="px-6 py-10">
          <h3 className="text-2xl font-semibold mb-6">🔥 Upcoming Anime</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {anime3.map((anime) => (
              <div
                key={anime.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{anime.title}</h4>
                  <p className="text-sm text-gray-400">{anime.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
