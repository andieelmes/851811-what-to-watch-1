import * as React from 'react';

import VideoPlayer from 'components/video-player/video-player';

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
      <VideoPlayer img={img} preview={preview} title={title} active={activeItem === id}/>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

export default MovieCard;
