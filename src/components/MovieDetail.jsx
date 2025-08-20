import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "get",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <p className="flex items-center justify-center text-white mt-10">
        <Spinner />
      </p>
    );

  return (
    <div className="min-h-screen text-white p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-300 hover:text-white transition cursor-pointer"
      >
        🔙 Back
      </button>

      {/* Movie content */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 object-cover"
        />

        {/* Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-300 mb-4">{movie.overview}</p>
            <p className="text-sm text-gray-400">
              Release Date: {movie.release_date}
            </p>
            <p className="text-sm text-gray-400">
              Original Language: {movie.original_language}
            </p>
            <p className="text-sm text-gray-400">
              Rating: ⭐ {movie.vote_average?.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
