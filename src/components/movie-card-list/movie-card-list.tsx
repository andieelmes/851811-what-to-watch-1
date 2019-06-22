import * as React from 'react';
import MovieCard from 'App/components/movie-card/movie-card';

import {Movie} from 'App/types';

interface Props {
  movies: Movie[],
  onChange: () => void
  activeItem: number,
  withButton: boolean,
  children: React.ReactChildren,
};

const MovieCardList: React.FunctionComponent<Props> = (props) => {
  const {
    movies,
    onChange,
    activeItem,
    children,
  } = props;

  return (
    <>
      <div className="catalog__movies-list">
        {
          movies.map((movie) => <MovieCard key={movie.id} onHover={onChange} activeItem={activeItem} {...movie}/>)
        }
      </div>
      {children}
    </>
  );
};

export default MovieCardList;
