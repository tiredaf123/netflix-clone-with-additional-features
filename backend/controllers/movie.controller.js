import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results?.length
      ? data.results[Math.floor(Math.random() * data.results.length)]
      : null;
    if (randomMovie) {
      res.json({ success: true, content: randomMovie });
    } else {
      res.status(404).json({ success: false, message: "No trending movies found" });
    }
  } catch (error) {
    console.error("Error in getTrendingMovie:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    if (data.results?.length) {
      res.json({ success: true, trailers: data.results });
    } else {
      res.status(404).json({ success: false, message: "No trailers found" });
    }
  } catch (error) {
    console.error("Error in getMovieTrailers:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    if (data) {
      res.status(200).json({ success: true, content: data });
    } else {
      res.status(404).json({ success: false, message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error in getMovieDetails:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    if (data.results?.length) {
      res.status(200).json({ success: true, similar: data.results });
    } else {
      res.status(404).json({ success: false, message: "No similar movies found" });
    }
  } catch (error) {
    console.error("Error in getSimilarMovies:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    if (data.results?.length) {
      res.status(200).json({ success: true, content: data.results });
    } else {
      res.status(404).json({ success: false, message: "No movies found in this category" });
    }
  } catch (error) {
    console.error("Error in getMoviesByCategory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
