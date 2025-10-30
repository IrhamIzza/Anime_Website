import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailManga() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getMangaDetail() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const data = await res.json();
      setManga(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMangaDetail();
  }, [id]);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-10">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <i className="ph ph-circle-notch animate-spin text-6xl text-white"></i>
        </div>
      )}
      {!loading && (
        <>
        <Link to="/manga" className="text-gray-400 hover:text-white mb-4 inline-block">← Back</Link>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={manga?.images?.jpg?.image_url}
            alt={manga?.title || "No title"}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{manga?.title}</h1>
            <p className="text-gray-400 mb-3 italic">{manga?.title_japanese}</p>
            <p className="mb-4 text-sm leading-relaxed">{manga?.synopsis}</p>

            <ul className="text-sm text-gray-300 space-y-1">
              <li><strong>Type:</strong> {manga?.type}</li>
              <li><strong>Chapters:</strong> {manga?.chapters || "?"}</li>
              <li><strong>Volumes:</strong> {manga?.volumes || "?"}</li>
              <li><strong>Status:</strong> {manga?.status}</li>
              <li><strong>Score:</strong> ⭐ {manga?.score || "N/A"}</li>
              <li><strong>Rank:</strong> #{manga?.rank || "?"}</li>
              <li><strong>Authors:</strong> {manga?.authors?.map(a => a.name).join(", ")}</li>
              <li><strong>Genres:</strong> {manga?.genres?.map(g => g.name).join(", ")}</li>
            </ul>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
