import * as React from 'react';
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {ActionCreator} from "App/reducer/data/data";
import {getGenres, getMovies} from "App/reducer/data/selectors";
import {getAuthorizationStatus, getUserInfo} from "App/reducer/user/selectors";

import privateRoute from 'App/hocs/private-route/private-route';

import Wrapper from 'App/components/wrapper/wrapper';
import Main from 'App/components/main/main';
import SignIn from 'App/components/sign-in/sign-in';
import Favorites from 'App/components/favorites/favorites';

import {Movie} from 'App/types';

const PrivateFavorites = privateRoute(Favorites);

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

class App extends React.PureComponent<Props, null> {
  render() {
    const {
      genres,
      movies,
      onGenreClick,
      user,
    } = this.props;

    return (
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
          <Route exact path="/login" component={SignIn}/>
          <Route exact path="/mylist" component={PrivateFavorites}/>
        </Switch>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userInfo = getUserInfo(state);

  return Object.assign({}, ownProps, {
    movies: getMovies(state),
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
