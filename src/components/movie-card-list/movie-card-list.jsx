import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from 'components/movie-card/movie-card.jsx';

const propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
  ),
  onChange: PropTypes.func.isRequired,
  activeItem: PropTypes.number,
};

const MovieCardList = (props) => {
  const {
    movies,
    onChange,
    activeItem,
  } = props;

  return (
    <div className="catalog__movies-list">
      {
        movies.map((movie) => <MovieCard key={movie.id} onHover={onChange} activeItem={activeItem} {...movie}/>)
      }
    </div>
  );
};

MovieCardList.propTypes = propTypes;

export default MovieCardList;
