import * as React from 'react';
import {Link} from 'react-router-dom';
import withActiveItem from 'App/hocs/with-active-item/with-active-item';
import MovieCardList from 'App/components/movie-card-list/movie-card-list';

import {Movie} from 'types';

interface Props {
  movies: Movie[],
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
};

const MovieCardListWithActiveItem = withActiveItem(MovieCardList);

const Favorites: React.FunctionComponent<Props> = (props) => {
  const {
    movies,
    user,
  } = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={user.avatar} alt={`User avatar of ${user.name}`} width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MovieCardListWithActiveItem movies={movies}/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default Favorites;
