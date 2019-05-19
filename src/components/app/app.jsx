import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Main from 'components/main/main.jsx';
import {ActionCreator} from "reducer";

const propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
  ),
  onGenreClick: PropTypes.func.isRequired,
  genre: PropTypes.string,
};

const defaultProps = {
  genre: `all genres`,
};

const App = (props) => {
  const {
    genre,
    movies,
    onGenreClick,
  } = props;


  return (
    <Main
      genre={genre}
      movies={movies}
      onGenreClick={(clickedGenre) => onGenreClick(clickedGenre, movies)}
    />
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: state.movies,
  genre: state.genre,
});


const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (genre, movies) => {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getMovies(genre, movies));
  },
});

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
