import * as React from 'react';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ActionCreator } from "App/reducer/data/data";
import { getGenres, getMovies, getFavorites } from "App/reducer/data/selectors";
import { getAuthorizationStatus, getUserInfo } from "App/reducer/user/selectors";

import privateRoute from 'App/hocs/private-route/private-route';
import withActiveItem from 'App/hocs/with-active-item/with-active-item';

import Wrapper from 'App/components/wrapper/wrapper';
import Main from 'App/components/main/main';
import SignIn from 'App/components/sign-in/sign-in';
import Favorites from 'App/components/favorites/favorites';
import Movie from 'App/components/movie/movie';

import { Movie as MovieType } from 'App/types';

const PrivateFavorites = privateRoute(Favorites);
const MoviePageWithActiveItem = withActiveItem(Movie);

interface Props {
  movies: MovieType[],
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
      favorites,
      onGenreClick,
      user,
    } = this.props;

    return (
      movies.length && (
      <Wrapper>
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <Main
                genres={genres}
                movies={movies}
                user={user}
                onGenreClick={(clickedGenre: string) => onGenreClick(clickedGenre)}
                {...props}
              />
            )}
          />
          <Route exact path="/login" render={(props) => (<SignIn user={user} {...props}/>)}/>
          <Route exact path="/mylist" render={(props) => (<PrivateFavorites user={user} movies={favorites} {...props}/>)}/>
          <Route path="/film/:id" render={(props) => {
            const currentMovie = movies.find((movie) => movie.id === +props.match.params.id);
            const similarMovies = movies.filter((movie) => movie.genre === currentMovie.genre && movie.id !== currentMovie.id).slice(0, 4);
            return <MoviePageWithActiveItem user={user} movie={currentMovie} similar={similarMovies} {...props}/>
          }}/>
        </Switch>
      </Wrapper>
    )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userInfo = getUserInfo(state);

  return Object.assign({}, ownProps, {
    movies: getMovies(state),
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
