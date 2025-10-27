import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailAnime() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getAnimeDetail() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAnimeDetail();
  }, [id]);

  //   if (loading) return <Loader fullscreen />;
  //   if (!anime) return <div className="text-white">Anime not found.</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-10">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <i className="ph ph-circle-notch animate-spin text-6xl text-white"></i>
        </div>
      )}
      {!loading && (
        <>
          <Link to="/anime" className="text-gray-400 hover:text-white mb-4 inline-block">← Back</Link>
          <div className="flex flex-col md:flex-row gap-8">

            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full md:w-1/3 rounded-lg shadow-lg" />

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
              <p className="text-gray-400 mb-3 italic">{anime.title_japanese}</p>
              <p className="mb-4 text-sm leading-relaxed">{anime.synopsis}</p>

              <ul className="text-sm text-gray-300 space-y-1">
                <li><strong>Type:</strong> {anime.type}</li>
                <li><strong>Episodes:</strong> {anime.episodes || "?"}</li>
                <li><strong>Status:</strong> {anime.status}</li>
                <li><strong>Score:</strong> ⭐ {anime.score || "N/A"}</li>
                <li><strong>Rank:</strong> #{anime.rank}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
