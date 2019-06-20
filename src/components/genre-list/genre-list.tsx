import * as React from 'react';

import {
  ALL_GENRES
} from "App/movie-variables";


interface Props {
  genres: string[],
  onChange: (genre: string) => void
  activeItem: string,
};

const defaultProps = {
  activeItem: ALL_GENRES,
};

const GenreList: React.FunctionComponent<Props> = (props) => {
  const {
    genres,
    onChange,
    activeItem,
  } = props;

  const _handleGenreClick = (e, genre) => {
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
              <a href="#" className="catalog__genres-link" onClick={(e) => _handleGenreClick(e, genre)}>{capitalizedGenre}</a>
            </li>
          );
        })
      }
    </ul>
  );
};

GenreList.defaultProps = defaultProps;

export default GenreList;
