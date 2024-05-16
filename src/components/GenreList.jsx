const GenreList = ({ genres, onClick, selectedGenres }) => {

  const isGenreActive = (id) => {
    if (!selectedGenres.length && id === -1) return true;

    return selectedGenres.indexOf(id) > -1;
  };

  return (
    <div className="genres">
      <div className="genres__list">
        {genres.map((genre) => (
          <div className={"genre__item " + (isGenreActive(genre.id) ? "active" : "")} key={genre.id} onClick={() => onClick(genre)}>
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
