import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { id, title, poster_path } = movie;

  return (
    <Link to={`/movie/${id}`}>
      <div className="bg-zinc-800 p-2 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w200${poster_path}`
              : "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-e670-622f-9467-61af89f52fac/raw?se=2025-04-25T21%3A04%3A16Z&sp=r&sv=2024-08-04&sr=b&scid=f93d722f-b3dc-5caf-a52b-c388bce45ca1&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-25T00%3A03%3A07Z&ske=2025-04-26T00%3A03%3A07Z&sks=b&skv=2024-08-04&sig=NRxDGG95NUYWAdZWWPU6ixxRXko1xEEGojNOUp48%2B%2BA%3D"
          }
          alt={title}
          className="w-full rounded"
        />
        <h2 className="mt-2 text-sm font-semibold text-center">{title}</h2>
      </div>
    </Link>
  );
}

export default MovieCard;
