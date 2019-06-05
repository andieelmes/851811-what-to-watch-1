import * as React from 'react';
import MovieCard from 'components/movie-card/movie-card.tsx';

import {Movie} from 'types';

interface Props {
  movies: Movie[],
  onChange: () => void
  activeItem: number,
};

const MovieCardList: React.FunctionComponent<Props> = (props) => {
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

export default MovieCardList;
