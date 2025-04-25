const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error fetching trending movies:", err);
    return [];
  }
}

export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return null;
  }
}

export async function fetchSearchResults(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error searching movies:", err);
    return [];
  }
}
