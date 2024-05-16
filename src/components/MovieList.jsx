import { useState, useEffect, useRef, Fragment } from "react";

import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import MovieSkeletonCard from "./MovieSkeletonCard";

const MovieList = ({ selectedGenres, getGenreName }) => {
  const [scrollDirection, setScrollDirection] = useState("");
  const [isInitialed, setIsInitialed] = useState(false);
  const [currentYear, setCurrentYear] = useState(2012);
  const { moviesByYear, isLoading } = useMovies({
    year: currentYear,
    genres: selectedGenres,
  });

  const topSentinelRef = useRef(null);
  const bottomSentinelRef = useRef(null);

  useEffect(() => {
    if (!isInitialed) return;

    setCurrentYear((prevState) => {
      if (!scrollDirection) return prevState;

      const incrementBy = scrollDirection === "upwards" ? -1 : 1;

      let nextState = prevState + incrementBy;

      while (moviesByYear[nextState]) {
        nextState = nextState + incrementBy;
      }

      if (nextState > new Date().getFullYear()) {
        nextState -= 1;
      }

      return nextState;
    });
  }, [scrollDirection]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (topSentinelRef.current) {
      observer.observe(topSentinelRef.current);
    }

    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    return () => {
      if (topSentinelRef.current) {
        observer.unobserve(topSentinelRef.current);
      }

      if (bottomSentinelRef.current) {
        observer.unobserve(bottomSentinelRef.current);
      }
    };
  }, []);

  const handleObserver = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        setScrollDirection("");

        setTimeout(() => {
          if (entry.target === topSentinelRef.current) {
            setScrollDirection("upwards");
          } else if (entry.target === bottomSentinelRef.current) {
            setScrollDirection("downwards");
          }
        }, 0);
      }
    });

    setTimeout(() => {
      setIsInitialed(true);
    }, 50);
  };

  return (
    <div className="movies__list">
      <div ref={topSentinelRef} className="movies__observer top" />
      <div className="row gy-4">
        {Object.entries(moviesByYear).map(([year, movies]) => (
          <Fragment key={year}>
            {movies.length > 0 && (
              <div className="col-12">
                <h2 className="movies__section__title">{year}</h2>
              </div>
            )}
            {movies.map((movie) => (
              <div className="col-lg-4 col-md-6 col-12" key={movie.id || movie}>
                {movie.id ? <MovieCard movie={movie} getGenreName={getGenreName} /> : <MovieSkeletonCard />}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomSentinelRef} className="movies__observer bottom" />
    </div>
  );
};

export default MovieList;
