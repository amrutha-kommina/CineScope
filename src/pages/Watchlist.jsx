import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-xl">Your watchlist is empty. Add some movies!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="border border-gray-800 rounded-lg p-4"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-300">{movie.overview}</p>
              <Link
                to={`/movie/${movie.id}`}
                className="text-pink-600 hover:text-pink-800 mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
