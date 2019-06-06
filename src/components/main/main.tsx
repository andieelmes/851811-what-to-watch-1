import * as React from 'react';
import withActiveItem from 'App/hocs/with-active-item/with-active-item';
import Profile from 'App/components/profile/profile';
import GenreList from 'App/components/genre-list/genre-list';
import MovieCardList from 'App/components/movie-card-list/movie-card-list';
import Footer from 'App/components/footer/footer';

import {Movie, User} from 'App/types';
import { getRandomElement, capitalize } from 'App/utils';

interface Props {
  movies: Movie[],
  onGenreClick: (genre: string) => void,
  genres: string[],
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
};

const GenreListWithActiveItem = withActiveItem(GenreList);
const MovieCardListWithActiveItem = withActiveItem(MovieCardList);

const Main: React.FunctionComponent<Props> = (props) => {
  const {
    genres,
    movies,
    onGenreClick,
    user,
  } = props;

  const mainMovie = getRandomElement(movies)

  return (
    <>
      <section className="movie-card" style={{ backgroundColor: mainMovie.backgroundColor}}>
        <div className="movie-card__bg">
          <img src={mainMovie.backgroundImage} alt={mainMovie.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <Profile user={user}/>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={mainMovie.poster} alt={`${mainMovie.title} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{mainMovie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{capitalize(mainMovie.genre)}</span>
                <span className="movie-card__year">{mainMovie.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreListWithActiveItem onActiveItemChange={onGenreClick} genres={genres}/>
          <MovieCardListWithActiveItem movies={movies} withButton/>
        </section>

        <Footer/>
      </div>
    </>
  );
};

export default Main;
