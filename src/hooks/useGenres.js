import { useEffect, useState } from "react";

import { CanceledError } from "../services/http-service";
import genreService from "../services/genre-service";

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = genreService.getAll();

    request
      .then((res) => {
        res.data.genres.splice(0, 0, {
          id: -1,
          name: "All",
        });
        setGenres(res.data.genres);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { genres, error, isLoading, setGenres, setError };
};

export default useGenres;
