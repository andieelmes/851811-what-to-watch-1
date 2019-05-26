import React from 'react';
import PropTypes from 'prop-types';

import {
  ALL_GENRES
} from "movie-variables";


const propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
};

const defaultProps = {
  activeItem: ALL_GENRES,
};

const GenreList = (props) => {
  const {
    genres,
    onChange,
    activeItem,
  } = props;

  const onGenreClick = (e, genre) => {
    e.preventDefault();
    onChange(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => {
          const [firstLetter, ...rest] = genre;
          const capitalizedGenre = [firstLetter.toUpperCase(), ...rest].join(``);

          return (
            <li
              key={genre}
              className={`catalog__genres-item ${genre === activeItem ? `catalog__genres-item--active` : ``}`}
            >
              <a href="#" className="catalog__genres-link" onClick={(e) => onGenreClick(e, genre)}>{capitalizedGenre}</a>
            </li>
          );
        })
      }
    </ul>
  );
};

GenreList.propTypes = propTypes;
GenreList.defaultProps = defaultProps;

export default GenreList;
