import * as React from 'react';
import {Link} from 'react-router-dom';

import VideoPlayer from 'App/components/video-player/video-player';

interface Props {
  id: number,
  img: string,
  preview: string,
  title: string,
  onHover: (id: number) => void,
  activeItem: number,
};

const MovieCard: React.FunctionComponent<Props> = (props) => {
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
      <VideoPlayer img={img} preview={preview} title={title} active={activeItem === id} id={id}/>
      <h3 className="small-movie-card__title">
        <Link to={`/film/${id}`} className="small-movie-card__link" href="movie-page.html">{title}</Link>
      </h3>
    </article>
  );
};

export default MovieCard;
