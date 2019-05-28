import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Main from 'components/main/main.jsx';
import {ActionCreator} from "reducer/data/data";
import {getGenres, getMovies} from "reducer/data/selectors";

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
  genres: PropTypes.arrayOf(PropTypes.string)
};

const App = (props) => {
  const {
    genres,
    movies,
    onGenreClick,
  } = props;


  return (
      <Wrapper>
        <Main
          genres={genres}
          movies={movies}
        onGenreClick={(clickedGenre) => onGenreClick(clickedGenre)}
      />
      </Wrapper>
    );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movies: getMovies(state),
  genres: getGenres(state)
});


const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (genre) => {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

App.propTypes = propTypes;

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
