import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const MovieCard = (props) => {
  const {
    id,
    img,
    title,
    onHover,
    onClick
  } = props;

  return (
    <article
      data-movie-id={id}
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <button className="small-movie-card__play-btn" type="button" onClick={() => onClick(id)}>Play</button>
      <div className="small-movie-card__image">
        <img src={img} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = propTypes;

export default MovieCard;
