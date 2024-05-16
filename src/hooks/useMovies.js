import { useEffect, useState } from "react";

import { CanceledError } from "../services/http-service";
import movieService from "../services/movie-service";

import { NO_OF_MOVIE_CARDS } from "../utils/constant";

const useMovies = (params) => {
  const [moviesByYear, setMoviesByYear] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {

    setMoviesByYear({
      [params.year]: [...Array(NO_OF_MOVIE_CARDS).keys()],
    });
  }, [params.genres.length]);

  useEffect(() => {
    setLoading(true);
    setMoviesByYear((prevState) => ({
      ...prevState,
      [params.year]: [...Array(NO_OF_MOVIE_CARDS).keys()],
    }));

    const { request, cancel } = movieService.getAll({
      with_genres: params.genres.join(","),
      primary_release_year: params.year,
    });

    request
      .then((res) => {
        setMoviesByYear((prevState) => ({
          ...prevState,
          [params.year]: res.data.results,
        }));
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {

          return;
        }

        setError(err.message);
        setLoading(false);

        setMoviesByYear((prevState) => {
            const { [params.year]: year, ...movies } = prevState;
            return movies;
          });

          setTimeout(() => {
            setError("");
          }, 5000);
      });

    return () => cancel();
  }, [params.year, params.genres.length]);

  return {
    moviesByYear,
    error,
    isLoading,
    setMoviesByYear
  };
};

export default useMovies;
