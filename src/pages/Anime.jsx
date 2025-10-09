import { useEffect, useState } from "react";

export default function Anime() {
  const [anime, setAnime] = useState([]);
  const [anime2, setAnime2] = useState([]);
  const [anime3, setAnime3] = useState([]);

  async function getData() {
    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?limit=10"
    );
    const data = await response.json();
    setAnime(data.data);
  }

  async function getData2() {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=10&filter=bypopularity");
    const data = await response.json()
    setAnime2(data.data);   
  }

  async function getData3() {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=10&filter=upcoming");
    const data = await response.json()
    setAnime3(data.data);   
  }
  useEffect(() => {
    getData();
    getData2();
    getData3();
  }, []);

  return (
    <>
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
