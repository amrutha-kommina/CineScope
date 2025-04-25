import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSearchResults } from "../api/tmdb";
import { X } from "lucide-react";

function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchSearchResults(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleEnter = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(""); // Clear the search input after hitting Enter
    }
  };

  return (
    <nav className="flex flex-col items-center bg-zinc-900 p-4 relative z-10">
      <div className="w-full flex items-center justify-between max-w-5xl">
        <Link to="/" className="text-xl font-bold text-pink-500 tracking-wide">
          CineScope
        </Link>

        <div className="relative flex-1 max-w-md ml-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
            className="w-full px-4 py-2 rounded-full bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Link
          to="/watchlist"
          className="text-white hover:text-pink-600 transition-colors ml-4"
        >
          Watchlist
        </Link>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full max-w-5xl bg-zinc-800 rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
          <p className="mb-2 text-gray-400 text-sm">Results:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="flex flex-col items-center hover:scale-105 transition-transform">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-e670-622f-9467-61af89f52fac/raw?se=2025-04-25T21%3A04%3A16Z&sp=r&sv=2024-08-04&sr=b&scid=f93d722f-b3dc-5caf-a52b-c388bce45ca1&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-25T00%3A03%3A07Z&ske=2025-04-26T00%3A03%3A07Z&sks=b&skv=2024-08-04&sig=NRxDGG95NUYWAdZWWPU6ixxRXko1xEEGojNOUp48%2B%2BA%3D"
                    }
                    alt={movie.title}
                    className="rounded shadow-md"
                  />
                  <p className="text-sm mt-1 text-center">{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
