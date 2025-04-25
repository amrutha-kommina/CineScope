import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">🔥 Trending This Week</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
