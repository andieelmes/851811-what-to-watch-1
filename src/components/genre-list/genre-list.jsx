import React from 'react';
import PropTypes from 'prop-types';
import {
  ALL_GENRES
} from "movie-variables";

const propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string,
};

const defaultProps = {
  genre: ALL_GENRES,
};

const GenreList = (props) => {
  const {
    genres,
    onClick,
    activeGenre,
  } = props;

  genres.unshift(ALL_GENRES);

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => {
          const [firstLetter, ...rest] = genre;

          const capitalizedGenre = [firstLetter.toUpperCase(), ...rest].join(``);

          const onGenreLinkClick = (e) => {
            e.preventDefault();
            onClick(genre);
          };

          return (
            <li
              key={genre}
              className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`}
            >
              <a href="#" className="catalog__genres-link" onClick={onGenreLinkClick}>{capitalizedGenre}</a>
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
