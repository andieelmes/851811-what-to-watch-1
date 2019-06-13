import * as React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Profile from 'App/components/profile/profile';
import withActiveItem from 'App/hocs/with-active-item/with-active-item';
import Reviews from 'App/components/reviews/reviews';
import MovieCardList from 'App/components/movie-card-list/movie-card-list';
import Footer from 'App/components/footer/footer';

import { getReviews } from "App/reducer/data/selectors";
import { Operation } from "App/reducer/data/data";

import { Movie as MovieType, Review as ReviewType } from 'App/types';
import { capitalize, getPlural, getRating, getHoursAndMinutes } from 'App/utils';
import { Tabs } from 'App/movie-variables';

interface Props {
  movie: MovieType,
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
  similar: MovieType[],
  onChange: (genre: string) => void
  onLoad: () => ReviewType[],
  activeItem: string,
  reviews: ReviewType[],
};

const MovieCardListWithActiveItem = withActiveItem(MovieCardList);

class Movie extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const {
      movie,
      user,
      similar,
      onChange,
      activeItem,
      reviews,
    } = this.props;

    const onTabClick = (e, activeItem: string) => {
      e.preventDefault();
      onChange(activeItem);
    };

    return (
      <>
        <section className="movie-card movie-card--full" style={{ backgroundColor: movie.backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
              </div>

              <Profile user={user}/>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{capitalize(movie.genre)}</span>
                  <span className="movie-card__year">{movie.year}</span>
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
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster} alt={`${movie.title} poster`} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className={`movie-nav__item ${(activeItem === Tabs.OVERVIEW || !activeItem) ? `movie-nav__item--active`: ''}`}>
                      <a href="#" className="movie-nav__link" onClick={(e) => onTabClick(e, Tabs.OVERVIEW)}>Overview</a>
                    </li>
                    <li className={`movie-nav__item ${activeItem === Tabs.DETAILS ? `movie-nav__item--active`: ''}`}>
                      <a href="#" className="movie-nav__link" onClick={(e) => onTabClick(e, Tabs.DETAILS)}>Details</a>
                    </li>
                    <li className={`movie-nav__item ${activeItem === Tabs.REVIEWS ? `movie-nav__item--active`: ''}`}>
                      <a href="#" className="movie-nav__link" onClick={(e) => onTabClick(e, Tabs.REVIEWS)}>Reviews</a>
                    </li>
                  </ul>
                </nav>


                { (activeItem === Tabs.OVERVIEW || !activeItem) && (
                  <>
                    <div className="movie-rating">
                      <div className="movie-rating__score">{movie.rating}</div>
                      <p className="movie-rating__meta">
                        <span className="movie-rating__level">{capitalize(getRating(movie.rating))}</span>
                        <span className="movie-rating__count">{movie.ratingsCount} {getPlural(movie.ratingsCount, 'rating', 'ratings')}</span>
                      </p>
                    </div>

                    <div className="movie-card__text">{movie.description}
                      <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

                      <p className="movie-card__starring"><strong>Starring: {movie.starring.map((star: string, index: number) => (
                        `${star}${index !== movie.starring.length - 1 && ', '}`
                      ))} and other</strong></p>
                    </div>
                  </>
                )}

                { activeItem === Tabs.DETAILS && (
                  <div className="movie-card__text movie-card__row">
                    <div className="movie-card__text-col">
                      <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Director</strong>
                        <span className="movie-card__details-value">{movie.director}</span>
                      </p>
                      <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Starring</strong>
                        <span className="movie-card__details-value">
                          {movie.starring.map((star: string, index: number) => (
                            `${star}${index !== movie.starring.length - 1 && ', '}`
                          ))}
                        </span>
                      </p>
                    </div>

                    <div className="movie-card__text-col">
                      <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Run Time</strong>
                        <span className="movie-card__details-value">{getHoursAndMinutes(movie.duration)}</span>
                      </p>
                      <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Genre</strong>
                        <span className="movie-card__details-value">{capitalize(movie.genre)}</span>
                      </p>
                      <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Released</strong>
                        <span className="movie-card__details-value">{movie.year}</span>
                      </p>
                    </div>
                  </div>
                )}
                { activeItem === Tabs.REVIEWS && <Reviews reviews={reviews}/>}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          { !!similar.length && (
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <MovieCardListWithActiveItem movies={similar} withButton/>
            </section>
          )}

          <Footer/>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    reviews: getReviews(state, ownProps.movie.id)
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    dispatch(Operation.loadComments(ownProps.movie.id));
  },
});

export {Movie};

const connectedMovie = connect(mapStateToProps, mapDispatchToProps)(Movie);

export default connectedMovie;
