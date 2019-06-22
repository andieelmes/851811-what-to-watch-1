import * as React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  img: string,
  preview: string,
  title: string,
  active: boolean,
  id: number,
  forwardedRef: React.RefObject<HTMLVideoElement>
};

const PreviewPlayer: React.FunctionComponent<Props> = (props) => {
  const {
    img,
    title,
    id,
    active,
    forwardedRef,
  } = props;

  const containerStyles: React.CSSProperties = {
    display: `block`,
  };

  const activeContainerStyles: React.CSSProperties = {
    display: `block`,
    position: `relavive` as `relative`,
    zIndex: 3,
  };

  const previewPlayerStyles: React.CSSProperties = {
    position: `relavive` as `relative`,
    zIndex: 2,
    objectFit: `cover`,
    maxWidth: `100%`,
    height: `100%`,
  };

  const hiddenStyles: React.CSSProperties = {
    display: `none`,
  };

  return (
    <Link
      to={`/film/${id}`}
      className="small-movie-card__image"
      style={props.active ? activeContainerStyles : containerStyles}
    >
      <img
        src={img}
        alt={title}
        width="280"
        height="175"
        style={active ? hiddenStyles : null}
      />
      <video
        poster={img}
        ref={forwardedRef}
        muted={true}
        controls={true}
        loop={true}
        style={active ? previewPlayerStyles : hiddenStyles}
      />
    </Link>
  );
}

export default PreviewPlayer;
