import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ReviewCard from "./ReviewCard";

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
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
      const data = await response.json();
      setMovie(data);
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}/reviews`,
          API_OPTIONS
        );
        const data = await response.json();
        setReviews(data.results || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchMovie();
    fetchReviews();
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

      {/* Reviews */}
      {/* Reviews */}
      <div className="max-w-5xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
        {loadingReviews ? (
          <Spinner />
        ) : reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No reviews available.</p>
        )}
      </div>
    </div>
  );
}
