import * as React from 'react';
import MovieCard from 'App/components/movie-card/movie-card';

import {Movie} from 'App/types';
import {INITIAL_MOVIES_LENGTH, MOVIES_TO_SHOW} from 'App/movie-variables';

interface Props {
  movies: Movie[],
  onChange: () => void
  activeItem: number,
  withButton: boolean,
};

interface State {
  show: number,
  increase: number,
};

class MovieCardList extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      show: INITIAL_MOVIES_LENGTH,
      increase: MOVIES_TO_SHOW,
    };

    this.onMore = this.onMore.bind(this);
  }

  onMore() {
    this.setState({
      show: this.state.show + this.state.increase,
    })
  }

  render() {
    const {
      movies,
      onChange,
      activeItem,
      withButton,
    } = this.props;

    return (
      <>
        <div className="catalog__movies-list">
          {
            movies.slice(0, this.state.show).map((movie) => <MovieCard key={movie.id} onHover={onChange} activeItem={activeItem} {...movie}/>)
          }
        </div>
        { (withButton && movies.length > this.state.show) && (
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={this.onMore}>Show more</button>
          </div>
        )}
      </>
    );
  }
};

export default MovieCardList;
