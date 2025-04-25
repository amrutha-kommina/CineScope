import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
