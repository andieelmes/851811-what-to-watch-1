import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {ActionCreator} from "reducer/data/data";
import {getGenres, getMovies} from "reducer/data/selectors";
import {getAuthorizationStatus, getUserInfo} from "reducer/user/selectors";

import Wrapper from 'components/wrapper/wrapper.jsx';
import Main from 'components/main/main.jsx';
import SignIn from 'components/sign-in/sign-in.jsx';

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

class App extends React.PureComponent {
  render() {
    const {
      genres,
      movies,
      onGenreClick,
      user,
    } = this.props;

    return (
      <Wrapper>
        <Main
          genres={genres}
          movies={movies}
          user={user}
          onGenreClick={(clickedGenre) => onGenreClick(clickedGenre)}
        />
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

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (genre) => {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

App.propTypes = propTypes;

export {App};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const AppWithRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={connectedApp}/>
      <Route path="/sign-in" component={SignIn}/>
    </Switch>
  </BrowserRouter>
);

export default AppWithRouter;
