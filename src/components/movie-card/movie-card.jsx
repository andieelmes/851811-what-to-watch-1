import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from 'components/video-player/video-player.jsx';

const propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
};

class MovieCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  _onMouseEnter() {
    this.setState({
      active: true,
    });
    this.props.onHover(this.props.id);
  }

  _onMouseLeave() {
    this.setState({
      active: false,
    });
    this.props.onHover(null);
  }

  render() {
    const {
      id,
      preview,
      img,
      title,
    } = this.props;

    return (
      <article
        data-movie-id={id}
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <VideoPlayer img={img} preview={preview} title={title} active={this.state.active}/>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = propTypes;

export default MovieCard;
