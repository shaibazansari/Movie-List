import StarRating from "./StarRating";

import { TMDB_IMAGE_URL } from "../utils/constant";

const MovieCard = ({ movie, getGenreName }) => {
  return (
    <div className="card">
      <div
        className="card__img"
        style={{
          backgroundImage: "url(" + TMDB_IMAGE_URL + movie.poster_path + ")",
        }}
      >
        <img
          src={TMDB_IMAGE_URL + movie.poster_path}
          alt={movie.title + " poster"}
        />
      </div>
      <div className="card__body">
        <h4 className="card__title">{movie.title}</h4>
        <StarRating rating={movie.vote_average} maxRating={10} />
        <div className="movie__badges">
          {movie.genre_ids.map((genre) => (
            <span key={genre} className="movie__badge">
              {getGenreName(genre)}
            </span>
          ))}
        </div>
        <p className="card__text">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
