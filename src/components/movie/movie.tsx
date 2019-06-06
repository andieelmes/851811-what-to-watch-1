import * as React from 'react';
import { Link } from 'react-router-dom';
import Profile from 'App/components/profile/profile';
import withActiveItem from 'App/hocs/with-active-item/with-active-item';
import MovieCardList from 'App/components/movie-card-list/movie-card-list';
import Footer from 'App/components/footer/footer';

import { Movie as MovieType } from 'App/types';
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
};

interface State {
  currentTab: string,
};

const MovieCardListWithActiveItem = withActiveItem(MovieCardList);

class Movie extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: Tabs.OVERVIEW,
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(e, value: string) {
    e.preventDefault()

    this.setState({
      currentTab: value,
    })
  }

  render() {
    const {
      movie,
      user,
      similar,
    } = this.props;

    const { currentTab } = this.state;

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src="/img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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
                    <li className={`movie-nav__item ${currentTab === Tabs.OVERVIEW ? `movie-nav__item--active`: ''}`}>
                      <a href="#" className="movie-nav__link" onClick={(e) => this.onTabChange(e, Tabs.OVERVIEW)}>Overview</a>
                    </li>
                    <li className={`movie-nav__item ${currentTab === Tabs.DETAILS ? `movie-nav__item--active`: ''}`}>
                      <a href="#" className="movie-nav__link" onClick={(e) => this.onTabChange(e, Tabs.DETAILS)}>Details</a>
                    </li>
                    <li className={`movie-nav__item ${currentTab === Tabs.REVIEWS ? `movie-nav__item--active`: ''}`}>
                      <a href="#" className="movie-nav__link" onClick={(e) => this.onTabChange(e, Tabs.REVIEWS)}>Reviews</a>
                    </li>
                  </ul>
                </nav>


                { currentTab === Tabs.OVERVIEW && (
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

                { currentTab === Tabs.DETAILS && (
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
                { currentTab === Tabs.REVIEWS && (
                  <div className="movie-card__reviews movie-card__row">
                    <div className="movie-card__reviews-col">
                      <div className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.</p>

                          <footer className="review__details">
                            <cite className="review__author">Kate Muir</cite>
                            <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                          </footer>
                        </blockquote>

                        <div className="review__rating">8,9</div>
                      </div>

                      <div className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                          <footer className="review__details">
                            <cite className="review__author">Bill Goodykoontz</cite>
                            <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                          </footer>
                        </blockquote>

                        <div className="review__rating">8,0</div>
                      </div>

                      <div className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.</p>

                          <footer className="review__details">
                            <cite className="review__author">Amanda Greever</cite>
                            <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                          </footer>
                        </blockquote>

                        <div className="review__rating">8,0</div>
                      </div>
                    </div>
                    <div className="movie-card__reviews-col">
                      <div className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

                          <footer className="review__details">
                            <cite className="review__author">Matthew Lickona</cite>
                            <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                          </footer>
                        </blockquote>

                        <div className="review__rating">7,2</div>
                      </div>

                      <div className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                          <footer className="review__details">
                            <cite className="review__author">Paula Fleri-Soler</cite>
                            <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                          </footer>
                        </blockquote>

                        <div className="review__rating">7,6</div>
                      </div>

                      <div className="review">
                        <blockquote className="review__quote">
                          <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                          <footer className="review__details">
                            <cite className="review__author">Paula Fleri-Soler</cite>
                            <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                          </footer>
                        </blockquote>

                        <div className="review__rating">7,0</div>
                      </div>
                    </div>
                  </div>
                )}
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
};

export default Movie;
