import React from 'react';
import PropTypes from 'prop-types';
import withActiveItem from 'hocs/with-active-item/with-active-item.jsx';
import {Link} from 'react-router-dom';
import GenreList from 'components/genre-list/genre-list.jsx';
import MovieCardList from 'components/movie-card-list/movie-card-list.jsx';
import {
  ALL_GENRES
} from "movie-variables";

const propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
  ),
  onGenreClick: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.shape({
    authorized: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
};

const defaultProps = {
  genre: ALL_GENRES,
};


const GenreListWithActiveItem = withActiveItem(GenreList);
const MovieCardListWithActiveItem = withActiveItem(MovieCardList);

const Main = (props) => {
  const {
    genres,
    movies,
    onGenreClick,
    user,
  } = props;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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

          <div className="user-block">
            {
              user.authorized
                ? (
                  <div className="user-block__avatar">
                    <img src={user.avatar} alt={`User avatar of ${user.name}`} width="63" height="63" />
                  </div>
                )
                : (
                  <Link to="/login" className="user-block__link">Sign in</Link>
                )
            }
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
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
          <MovieCardListWithActiveItem movies={movies}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
    </>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
