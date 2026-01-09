import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailAnime() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);

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
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`
      );
      const data = await res.json();
      setCharacters(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getStaff() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/staff`);
      const data = await res.json();
      setStaff(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getAnimeDetail();
    getCharacters();
    getStaff();
  }, [id]);

  //   if (loading) return <Loader fullscreen />;
  //   if (!anime) return <div className="text-white">Anime not found.</div>;

  if (loading || !anime || !stats) {
    return (
      <div className="bg-gray-900 text-white md:px-20 pt-2 pb-5">
        <div className="flex justify-center items-center h-screen">
          <i className="ph ph-circle-notch animate-spin text-6xl text-white"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-10">
      <div className="pb-5">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          <img
            src={anime.images?.webp.image_url}
            alt={anime.title}
            className="rounded-lg shadow-lg w-56"
            // loading="lazy"
          />

          <div className="flex-1 ">
            <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
            <p className="text-gray-400  mb-3 italic">{anime.title_japanese}</p>
            <p className="mb-4 text-sm text-gray-300 leading-relaxed">
              {anime.synopsis}
            </p>
          </div>
        </div>
      </div>
      {/* RANK */}
      <div className="bg-gray-800 w-56 rounded-sm p-2">
        <p className="text-center text-blue-300 "> RANK : {anime.rank}</p>
      </div>

      <div className="flex flex-1 py-3 gap-5 items-start">
        {/* information */}
        <div className="bg-gray-800 p-4 rounded-sm w-56 hidden md:block">
          <ul className="text-sm text-gray-300 space-y-2">
            {/* <li className="text-gray-400"><strong>INFORMATION</strong></li> */}
            <li>
              <strong className="mb-1">Type</strong>
              <p className="text-gray-400">{anime.type}</p>
            </li>
            <li>
              <strong className="mb-1">Episodes</strong>
              <p className="text-gray-400">{anime.episodes || "?"}</p>
            </li>
            <li>
              <strong className="mb-1">Episode Duration</strong>
              <p className="text-gray-400">{anime.duration}</p>
            </li>
            <li>
              <strong className="mb-1">Status</strong>
              <p className="text-gray-400">{anime.status}</p>
            </li>
            <li>
              <strong className="mb-1">Score ⭐</strong>
              <p className="text-gray-400"> {anime.score || "N/A"}</p>
            </li>
            <li>
              <strong className="mb-1">Season</strong>
              <p className="text-gray-400 capitalize">
                {" "}
                {anime.season} {anime.year}
              </p>
            </li>
            <li>
              <strong className="mb-1">Rating</strong>
              <p className="text-gray-400 capitalize">{anime.rating}</p>
            </li>
            <li>
              <strong className="mb-1">Popularity</strong>
              <p className="text-gray-400 capitalize">{anime.popularity}</p>
            </li>
            <li>
              <strong className="mb-1">Producers</strong>
              {anime.producers.map((item) => (
                <p key={item.mal_id} className="text-gray-400 capitalize">
                  {item.name}
                </p>
              ))}
            </li>
            <li>
              <strong className="mb-1">Genre</strong>
              {anime.genres.map((item) => (
                <p key={item.mal_id} className="text-gray-400 capitalize">
                  {item.name}
                </p>
              ))}
            </li>
          </ul>
        </div>

        {/* Characters */}
        <div className="flex flex-1 flex-col gap-1 md:gap-4">
          <div>
            <div className="text-gray-300 ">Characters</div>
            <div className="flex flex-wrap gap-3 ">
              {characters.slice(0, 6).map((item) => (
                <div
                  key={item.character.mal_id}
                  className="flex card justify-between bg-gray-800 w-64 md:w-md"
                >
                  <div className="flex">
                    <img
                      className="w-10 md:w-20"
                      src={item.character.images.webp.image_url}
                      alt=""
                    />
                    <div className="p-2">
                      <h4 className="text-xs md:text-base text-gray-300 font-bold">
                        {item.character.name}
                      </h4>
                      <p className="text-xs text-gray-400">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="p-2 ">
                      <h4 className="text-xs md:text-base text-gray-300 font-bold">
                        {item.voice_actors[0]?.person.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {item.voice_actors[0]?.language}
                      </p>
                    </div>
                    <img
                      className="w-10 md:w-20"
                      src={item.voice_actors[0]?.person.images.jpg.image_url}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div>
            <div className="text-gray-300 ">Staff</div>
            <div className="flex flex-wrap gap-3 ">
              {staff.slice(0, 4).map((item) => (
                <div
                  key={item.person.mal_id}
                  className="flex card justify-between bg-gray-800 w-64 md:w-md"
                >
                  <div className="flex">
                    <img
                      className="w-10 md:w-20"
                      src={item.person.images.jpg.image_url}
                      alt=""
                    />
                    <div className="p-2">
                      <h4 className="text-xs md:text-base text-gray-300 font-bold">
                        {item.person.name}
                      </h4>
                      <p className="text-xs text-gray-400">{item.positions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
