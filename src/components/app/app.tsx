import * as React from 'react';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { compose } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ActionCreator } from "App/reducer/data/data";
import { getGenres, getMovies, getFavorites, getPromoMovie } from "App/reducer/data/selectors";
import { getAuthorizationStatus, getUserInfo } from "App/reducer/user/selectors";

import privateRoute from 'App/hocs/private-route/private-route';
import withActiveItem from 'App/hocs/with-active-item/with-active-item';
import withMoviePlayer from 'App/hocs/with-movie-player/with-movie-player';
import withReviewForm from 'App/hocs/with-review-form/with-review-form';

import Wrapper from 'App/components/wrapper/wrapper';
import Main from 'App/components/main/main';
import SignIn from 'App/components/sign-in/sign-in';
import Favorites from 'App/components/favorites/favorites';
import Movie from 'App/components/movie/movie';
import AddReview from 'App/components/add-review/add-review';

import { Movie as MovieType } from 'App/types';

import {
  SIMILART_MOVIES_TO_SHOW
} from "App/movie-variables";

const PrivateFavorites = privateRoute(Favorites);
const MainPageWithMoviePlayer = withMoviePlayer(Main);

const composeMoviePage = (WrappedComponent) => compose(withMoviePlayer, withActiveItem)(WrappedComponent);
const MoviePageWithActiveItemWithMoviePlayer = composeMoviePage(Movie)

const composeAddReviewPage = (WrappedComponent) => compose(privateRoute, withReviewForm)(WrappedComponent);
const PrivateAddReviewPageWithForm = composeAddReviewPage(AddReview)

interface Props {
  movies: MovieType[],
  promo: MovieType,
  favorites: MovieType[],
  onGenreClick: (genre: string) => void,
  genres: string[],
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
};

class App extends React.PureComponent<Props, null> {
  render() {
    const {
      genres,
      movies,
      promo,
      favorites,
      onGenreClick,
      user,
    } = this.props;

    return (
      (movies.length && !!promo) && (
      <Wrapper>
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <MainPageWithMoviePlayer
                genres={genres}
                movies={movies}
                promo={promo}
                user={user}
                moviePlayerContent={promo}
                onGenreClick={(clickedGenre: string) => onGenreClick(clickedGenre)}
                {...props}
              />
            )}
          />
          <Route exact path="/login" render={(props) => (<SignIn user={user} {...props}/>)}/>
          <Route exact path="/mylist" render={(props) => (<PrivateFavorites user={user} movies={favorites} {...props}/>)}/>
          <Route path="/film/:id/review" render={(props) => {
            const currentMovie = App._getCurrentMovie(movies, +props.match.params.id)
            return <PrivateAddReviewPageWithForm user={user} movie={currentMovie} {...props}/>
          }}/>
          <Route path="/film/:id" render={(props) => {
            const currentMovie = App._getCurrentMovie(movies, +props.match.params.id)
            const similarMovies = movies.filter((movie) => movie.genre === currentMovie.genre && movie.id !== currentMovie.id).slice(0, SIMILART_MOVIES_TO_SHOW);
            return <MoviePageWithActiveItemWithMoviePlayer moviePlayerContent={currentMovie} user={user} movie={currentMovie} similar={similarMovies} {...props}/>
          }}/>
        </Switch>
      </Wrapper>
    ));
  }

  static _getCurrentMovie(movies, id) {
    return movies.find((movie) => movie.id === id);
  }
}

const mapStateToProps = (state, ownProps) => {
  const userInfo = getUserInfo(state);

  return Object.assign({}, ownProps, {
    movies: getMovies(state),
    promo: getPromoMovie(state),
    favorites: getFavorites(state),
    genres: getGenres(state),
    user: {
      authorized: getAuthorizationStatus(state),
      avatar: userInfo.avatar,
      name: userInfo.name,
    }
  });
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGenreClick: (genre: string) => {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

export {App};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const AppWithRouter = () => (
  <BrowserRouter>
    <Route component={connectedApp}/>
  </BrowserRouter>
);

export default AppWithRouter;
