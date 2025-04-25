import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";
import Spinner from "../components/Spinner";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isMovieInWatchlist = watchlist.some((item) => item.id === movie?.id);
    setIsInWatchlist(isMovieInWatchlist);
  }, [movie]);

  const handleWatchlistClick = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (isInWatchlist) {
      watchlist = watchlist.filter((item) => item.id !== movie.id);
      alert("Movie removed from watchlist successfully!");
    } else {
      watchlist.push(movie);
      alert("Movie added to watchlist successfully!");
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    setIsInWatchlist(!isInWatchlist);
  };

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <Spinner />;

  //   const addToWatchlist = () => {
  //     const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  //     if (!watchlist.some((item) => item.id === movie.id)) {
  //       watchlist.push(movie);
  //       localStorage.setItem("watchlist", JSON.stringify(watchlist));
  //       alert("Movie added to watchlist!");
  //     } else {
  //       alert("This movie is already in your watchlist!");
  //     }
  //   };

  return (
    <div className="p-4">
      <div
        className="h-60 md:h-96 bg-cover bg-center rounded-xl mb-6"
        style={{
          backgroundImage: `url(${
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-c608-622f-bf74-79402b9d68ad/raw?se=2025-04-25T21%3A26%3A28Z&sp=r&sv=2024-08-04&sr=b&scid=d8d5ab38-3084-5771-9093-9b875ded36d9&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-25T00%3A02%3A58Z&ske=2025-04-26T00%3A02%3A58Z&sks=b&skv=2024-08-04&sig=BMhrDdV6rqvA36OXiMr6KCWjDWwCErLKAZ%2BFTqPn40E%3D"
          })`,
        }}
      ></div>
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-300 text-sm mb-4">{movie.overview}</p>
      <div className="flex flex-wrap gap-2">
        {movie.genres.map((genre) => (
          <span
            key={genre.id}
            className="bg-pink-600 text-sm px-2 py-1 rounded-full"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <button
        onClick={handleWatchlistClick}
        className={`cursor-pointer my-4 px-4 py-2 rounded text-white ${
          isInWatchlist ? "bg-red-600" : "bg-pink-600"
        }`}
      >
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default MovieDetail;
