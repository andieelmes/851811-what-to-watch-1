import * as React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Profile from 'App/components/profile/profile';

import { Movie as MovieType, Review as ReviewType } from 'App/types';

import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from 'App/movie-variables';

interface Props {
  movie: MovieType,
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
  onTextChange: () => void,
  onRatingChange: () => void,
  onFormSubmit: () => void,
  onSuccess: () => void,
  onError: () => void,
  text: string,
  rating: number,
  isSubmitting: boolean,
};

const AddReview: React.FunctionComponent<Props> = (props) => {
  const {
    user,
    movie,
    onTextChange,
    onRatingChange,
    onFormSubmit,
    text,
    rating,
    isSubmitting,
  } = props;

  const disabledStyles = {
    color: 'grey',
    opacity: 0.7,
  }

  const textIsValid = text.length <= MAX_REVIEW_LENGTH && text.length >= MIN_REVIEW_LENGTH;
  const isValid = textIsValid && rating;

  return (
    <section className="movie-card movie-card--full" style={{ backgroundColor: movie.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/film/${movie.id}`} className="breadcrumbs__link">{movie.title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <Profile user={user}/>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img  src={movie.poster} alt={`${movie.title} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={onFormSubmit}
        >
          <div className="rating">
            <div className="rating__stars">

              {
                new Array(5).fill(1).map((_el, index) => (
                  <Fragment key={index}>
                    <input
                      className="rating__input"
                      id={`star-${index + 1}`}
                      type="radio"
                      name="rating"
                      value={index + 1}
                      onChange={onRatingChange}
                      checked={rating === index + 1}
                      disabled={isSubmitting}
                    />
                    <label className="rating__label" htmlFor={`star-${index + 1}`}>Rating {index + 1}</label>
                  </Fragment>
                ))
              }
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              onChange={onTextChange}
              defaultValue={text}
              minLength={50}
              maxLength={400}
              disabled={isSubmitting}
            />
            <div className="add-review__submit">
              {
                (!textIsValid && text.length > 0) &&  (
                  <span style={{color: 'red', paddingRight: '20px'}}>{text.length}</span>
                )
              }
              <button
                className="add-review__btn"
                type="submit"
                disabled={!isValid || isSubmitting}
                style={!isValid ? disabledStyles : null}
              >Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>
  )
}

export default AddReview;
