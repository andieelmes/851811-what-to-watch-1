import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from 'components/video-player/video-player.tsx';

const propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
  activeItem: PropTypes.number,
};

const MovieCard = (props) => {
  const {
    id,
    preview,
    img,
    title,
    onHover,
    activeItem,
  } = props;

  return (
    <article
      data-movie-id={id}
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <VideoPlayer img={img} preview={preview} title={title} active={activeItem === id}/>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = propTypes;

export default MovieCard;
