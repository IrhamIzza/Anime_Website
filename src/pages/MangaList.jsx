import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MangaList() {
  const { type } = useParams();
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let url = "https://api.jikan.moe/v4/top/manga?limit=20";

        if (type === "popular") url = "https://api.jikan.moe/v4/top/manga?limit=20&filter=bypopularity";
        else if (type === "upcoming") url = "https://api.jikan.moe/v4/top/manga?limit=20&filter=upcoming";
        // default (trending) biarkan url aslinya

        const res = await fetch(url);
        const data = await res.json();
        setManga(data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 md:px-20">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <i className="ph ph-circle-notch animate-spin text-6xl text-white"></i>
        </div>
      )}

      {!loading && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold capitalize">{type} Manga</h1>
            <Link
              to="/manga"
              className="text-md text-gray-400 font-semibold hover:text-white transition"
            >
              ← Back
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {manga.map((item) => (
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
        </>
      )}
    </div>
  );
}
