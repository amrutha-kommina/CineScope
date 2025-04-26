import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchSearchResults(query)
        .then((data) => setResults(data))
        .finally(() => setLoading(false));
    }
  }, [query]);

  if (loading) return Spinner;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-4">
        Search results for "{query}"
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-400">No movies found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
