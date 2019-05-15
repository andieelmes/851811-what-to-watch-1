import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from 'components/movie-card/movie-card.jsx';

const propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
  ),
};

class MovieCardList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: null
    };

    this.onHover = this.onHover.bind(this);
  }

  onHover(cardId) {
    this.setState({
      activeCardId: cardId
    });
  }

  render() {
    const {
      movies,
    } = this.props;

    return (
      <div className="catalog__movies-list">
        {
          movies.map((movie) => <MovieCard key={movie.id} onHover={this.onHover} {...movie}/>)
        }
      </div>
    );
  }
}

MovieCardList.propTypes = propTypes;

export default MovieCardList;
