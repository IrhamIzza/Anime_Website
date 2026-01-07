import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailAnime() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

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

  async function getCharacters() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
      const data = await res.json();
      setCharacters(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAnimeDetail();
    getCharacters();
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
          <div className="pb-5">
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <img
                src={anime.images.webp.image_url}
                alt={anime.title}
                className="rounded-lg shadow-lg w-56"
              />

              <div className="flex-1 ">
                <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
                <p className="text-gray-400  mb-3 italic">{anime.title_japanese}</p>
                <p className="mb-4 text-sm text-gray-300 leading-relaxed">{anime.synopsis}</p>


              </div>
            </div>
          </div>
          {/* RANK */}
          <div className="bg-gray-800 w-56 rounded-sm p-2">
            <p className="text-center text-blue-300 "> RANK : {anime.rank}</p>
          </div>

          <div className="flex flex-1 py-3 gap-5">
            <div className="bg-gray-800 p-4 rounded-sm w-56">
              <ul className="text-sm text-gray-300 space-y-1">
                <li><strong>Type:</strong> {anime.type}</li>
                <li><strong>Episodes:</strong> {anime.episodes || "?"}</li>
                <li><strong>Status:</strong> {anime.status}</li>
                <li><strong>Score:</strong> ⭐ {anime.score || "N/A"}</li>

              </ul>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="text-gray-300 ">Characters</div>
              <div>
                <div className="flex flex-wrap gap-2">
                {characters.map((item) => (
                  <div key={item.character.mal_id} className="flex card justify-between bg-gray-800 mb-2 w-md">
                    <div className="flex">
                      <img className="w-20" src={item.character.images.webp.image_url} alt="" />
                      <div className="p-2">
                        <h4 className="text-md text-gray-300 font-bold">{item.character.name}</h4>
                        <p className="text-xs text-gray-400">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="p-2 ">
                        <h4 className="text-md text-gray-300 font-bold">{item.voice_actors[0]?.person.name}</h4>
                        <p className="text-xs text-gray-400">Main</p>
                      </div>
                      <img className="w-20" src={item.voice_actors[0]?.person.images.jpg.image_url} alt="" />
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col md:flex-row gap-8">

            <img src={anime.images.webp.image_url} alt={anime.title} className="w-full md:w-1/3 rounded-lg shadow-lg" />

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
          </div> */}
        </>
      )}
    </div>
  );
}
