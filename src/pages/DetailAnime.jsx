import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailAnime() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [episode2, setEpisode2] = useState([]);
  const [limit, setLimit] = useState(4);
  const [recommendations, setRecommendations] = useState([]);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  async function getAnimeDetail() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    } catch (error) {
      console.error(error);
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
    } 
  }

  async function getStats() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/statistics`
      );
      const data = await res.json();
      setStats(data.data);
    } catch (error) {
      console.error(error);
    } 
  }

  async function getEpisode() {
    try {
      const [res1, res2] = await Promise.all([
        fetch(`https://api.jikan.moe/v4/anime/${id}/videos/episodes`),
        fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      setEpisode(data1.data);
      setEpisode2(data2.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRecommendations() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/recommendations`
      );
      const data = await res.json();
      setRecommendations(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchAll() {      
      await getAnimeDetail();
      await getCharacters();
      await getStaff();
      // await delay(300);
      await getStats();
      await getEpisode();
      await getRecommendations();
      setLoading(false);
    }
    fetchAll();
  }, [id]);

  if (loading || !anime || !stats || !stats.scores || !episode || !episode2 || !recommendations) {
    return (
      <div className="bg-gray-900 text-white md:px-20 pt-2 pb-5">
        <div className="flex justify-center items-center h-screen">
          <i className="ph ph-circle-notch animate-spin text-6xl text-white"></i>
        </div>
      </div>
    );
  }

  const items = [
    {
      label: "Completed",
      value: stats.completed,
      color: "bg-green-600",
    },
    {
      label: "Current",
      value: stats.watching,
      color: "bg-blue-600",
    },
    {
      label: "Planning",
      value: stats.plan_to_watch,
      color: "bg-purple-600",
    },
    {
      label: "Dropped",
      value: stats.dropped,
      color: "bg-red-600",
    },
    {
      label: "Plan to Watch",
      value: stats.plan_to_watch,
      color: "bg-yellow-600",
    },
  ];
  const total = stats.total;

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-10">
      <div className="pb-5">
        <div className="flex flex-col md:flex-row gap-5 items-start ">
          <img
            src={anime.images?.webp.image_url}
            alt={anime.title}
            className="rounded-lg shadow-lg w-56 flex mx-auto"
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
      <div className="bg-gray-800  md:w-56 rounded-sm p-2 ">
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

          {/* Status distribution */}
          <div className="flex gap-3 max-w-[900px] items-stretch">
            <div className="flex flex-col">
              <h3 className="text-gray-300"> Status Distribution </h3>
              <div className="bg-gray-800 rounded-sm w-64 md:w-md flex flex-col h-full">
                <div className="flex flex-col h-full justify-between">
                  {/* Label */}
                  <div className="flex flex-wrap gap-2 pt-7 px-2 justify-center md:justify-between">
                    {items.map((item) => (
                      <div key={item.label}>
                        <div
                          className={`px-2 py-1 rounded-md text-xs font-medium ${item.color} text-white text-center`}
                        >
                          {item.label}
                        </div>
                        <p className="text-xs opacity-80 text-center">
                          {(item.value ?? 0).toLocaleString()} Users
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* PROGRESS BAR */}
                  <div className="flex h-5 mt-4 rounded-full overflow-hidden bg-gray-700">
                    {items.map((item) => (
                      <div
                        key={item.label}
                        className={`${item.color} transition-all duration-500`}
                        style={{
                          width: `${(item.value / total) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-gray-300"> Score Distribution </h3>
              <div className="bg-gray-800 h-full rounded-sm w-64 md:w-md overflow-x-auto items-end flex gap-1 p-3">
                {stats.scores.map((item) => (
                  <div
                    key={item.score}
                    className="flex flex-col items-center mx-auto gap-1"
                  >
                    <p className="text-gray-300 text-xs">
                      {item.votes.toLocaleString()}
                    </p>
                    <div
                      className="w-4 bg-gradient-to-br from-green-500 via-lime-300 to-yellow-400 rounded-full"
                      style={{ height: `${item.percentage * 1.5}px` }}
                    />
                    <p className="text-xs text-gray-400">{item.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Episode */}
          {episode.length > 0 ? (
            <div>
              <h3 className="text-gray-300 "> Episode </h3>
              <div className="flex flex-wrap gap-3 max-w-[900px]">
                {episode.slice(0, limit).map((item) => (
                  <div key={item.mal_id} className="flex flex-col ">
                    <div className="bg-gray-800 flex flex-col w-54 h-full rounded-md overflow-hidden">
                      <img
                        src={item.images.jpg.image_url? item.images.jpg.image_url : anime.images.jpg.image_url}
                        alt=""
                        className="opacity-70"
                      />
                      <div className="p-3 text-sm text-center text-gray-300">
                        <div>{item.episode}</div>
                        <div className="line-clamp-1">{item.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* TOMBOL MORE */}
                {episode.length > limit && (
                  <div className="hidden md:flex ml-auto mt-[-4px]">
                    <p
                      onClick={() => setLimit(limit === 4 ? 8 : 4)}
                      className="text-sm rounded-md  text-gray-400 cursor-pointer"
                    >
                      {limit === 4 ? "More >>" : "Less <<"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : episode2.length > 0 ? (
            <div>
              <h3 className="text-gray-300 "> Episode </h3>
              <div className="flex flex-wrap gap-3 max-w-[900px]">
                {episode2.slice(0, limit).map((item) => (
                  <div key={item.mal_id} className="flex flex-col ">
                    <div className="bg-gray-800 flex flex-col w-54 h-full rounded-md overflow-hidden">
                      <img
                        src={anime.images?.jpg.image_url}
                        alt=""
                        className="opacity-70"
                      />
                      <div className="p-3 text-sm text-center text-gray-300">
                        <div>{item.episode}</div>
                        <div className="line-clamp-1">Episode {item.mal_id}</div>
                        <div className="line-clamp-1">{item.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* TOMBOL MORE */}
                {episode2.length > limit && (
                  <div className="hidden md:flex ml-auto mt-[-4px]">
                    <p
                      onClick={() => setLimit(limit === 4 ? 8 : 4)}
                      className="text-sm rounded-md  text-gray-400 cursor-pointer"
                    >
                      {limit === 4 ? "More >>" : "Less <<"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p></p>
          )}

          {/* Recommendations */}
          <div>
            <h3 className="text-gray-300 "> Recommendations </h3>
            <div className="flex flex-wrap gap-3 max-w-[900px]">
              {recommendations.slice(0, 5).map((item) => (
                <Link
                  key={item.entry.mal_id}
                  to={`/anime/detail/${item.entry.mal_id}`}
                  className="flex flex-col"
                >
                  <div className="bg-gray-800 flex flex-col w-42 h-full rounded-md overflow-hidden hover:scale-[1.03] transition-all">
                    <img
                      src={item.entry.images?.webp.image_url}
                      alt={item.entry.title}
                      className="opacity-70 h-52 object-cover"
                    />
                    <div className="p-3 text-center text-gray-300">
                      <div className="line-clamp-2">{item.entry.title}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
