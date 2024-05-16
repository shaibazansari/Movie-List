import { useState, useMemo } from "react";

import GenreList from "../components/GenreList";
import MovieList from "../components/MovieList";
import useGenres from "../hooks/useGenres";


const HomePage = () => {
  const { genres } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreDict = {}

  const handleClick = (genre) => {
    setSelectedGenres((prevState) => {
      return prevState.indexOf(genre.id) === -1 ? [...prevState, genre.id] : prevState.filter((genreId) => genreId !== genre.id);
    });
  };

  const getGenreName = (id) => {
    if (genreDict[id]) return genreDict[id];

    for (let i = 0; i < genres.length; i++) {
      if (genres[i].id === id){
        genreDict[id] = genres[i].name
        return genreDict[id];
      }
    } 
  }

  return (
    <>
      <div className="genre-container">
        <GenreList genres={genres} selectedGenres={selectedGenres} onClick={handleClick} />
      </div>
      <div className="container movie-container">
        <MovieList selectedGenres={selectedGenres} getGenreName={getGenreName}/>
      </div>
    </>
  );
};

export default HomePage;
