import * as React from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Operation as DataOperation } from "reducer/data/data";
import { Operation as UserOperation } from "reducer/user/user";
import { Link } from 'react-router-dom';
import Profile from 'App/components/profile/profile';

import { Movie as MovieType, Review as ReviewType } from 'App/types';

interface Props {
  onSubmit: (id: number, {}: { rating: number, comment: string}, onSuccess: () => void, onError: () => void) => void,
  history: {push: (string) => void},
  getLogin: () => void,
  movie: MovieType,
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
};

interface State {
  text: string,
  rating: number,
  isSubmitting: boolean,
};

class AddReview extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: ``,
      rating: 3,
      isSubmitting: false,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    this.props.getLogin();
  }

  componentDidUpdate() {
    const {
      user,
      history
    } = this.props;
  }

  onTextChange({target: {value}}) {
    this.setState({
      text: value
    });
  }

  onRatingChange({target: {value}}) {
    this.setState({
      rating: +value
    });
  }

  onSubmit(e) {
    const {
      onSubmit,
      movie
    } = this.props;

    e.preventDefault();
    this.setState({ isSubmitting: true })

    onSubmit(movie.id, {rating: this.state.rating, comment: this.state.text}, this.onSuccess, this.onError);
  }

  onSuccess() {
    this.props.history.push(`/film/${this.props.movie.id}`);
  }

  onError() {
    this.setState({ isSubmitting: false })
  }

  render() {
    const {
      text,
      rating,
      isSubmitting,
    } = this.state;

    const {
      user,
      movie,
    } = this.props;

    const disabledStyles = {
      color: 'grey',
      opacity: 0.7,
    }

    const isValid = text.length <= 400 && text.length >= 50;

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
            onSubmit={this.onSubmit}
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
                        onChange={this.onRatingChange}
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
                onChange={this.onTextChange}
                defaultValue={text}
                minLength={50}
                maxLength={400}
                disabled={isSubmitting}
              />
              <div className="add-review__submit">
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
    );
  }
}

export {AddReview};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (id, {rating, comment}, onSuccess, onError) => {
    dispatch(DataOperation.postComment(id, rating, comment, onSuccess, onError)).then(() => dispatch(DataOperation.loadComments(ownProps.movie.id)));
  },
  getLogin: () => {
    dispatch(UserOperation.getLogin());
  },
});

export default connect(null, mapDispatchToProps)(AddReview);
