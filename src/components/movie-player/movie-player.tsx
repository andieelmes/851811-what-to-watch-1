import * as React from 'react';

import { Movie as MovieType } from 'App/types';

interface Props {
  movie: MovieType,
  onExit: () => void,
  forwardedVideoRef: React.RefObject<HTMLVideoElement>,
  forwardedProgressRef: React.RefObject<HTMLProgressElement>,
  isLoading: boolean,
  isPlaying: boolean,
  isFullscreen: boolean,
  progress: number,
  height: number,
  isMousedown: boolean,
  formattedTimeLeft: string,
  onTimeUpdate: () => void,
  onProgressClick: (e) => void,
  onProgressMouseDown: () => void,
  onProgressMouseUp: () => void,
  onTogglePlayClick: () => void,
  onFullscreenClick: () => void,
};

const MoviePlayer: React.FunctionComponent<Props> = (props) => {
  const {
    forwardedVideoRef,
    forwardedProgressRef,
    movie,
    onExit,
    progress,
    isPlaying,
    height,
    isFullscreen,
    isMousedown,
    formattedTimeLeft,
    onTimeUpdate,
    onProgressClick,
    onProgressMouseDown,
    onProgressMouseUp,
    onTogglePlayClick,
    onFullscreenClick,
  } = props;


  return (
    <div className="player"
      style={{
        backgroundColor: 'black',
        display: 'flex',
      }}
    >
      <video
        className="player__video"
        poster={movie.backgroundImage}
        ref={forwardedVideoRef}
        onTimeUpdate={onTimeUpdate}
        style={{
          height: (isFullscreen || height === 0) ? '100%' : height,
          alignSelf: 'center'
        }}
      />
      <button type="button" className="player__exit" onClick={onExit}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progress}
              max="100"
              ref={forwardedProgressRef}
              onClick={onProgressClick}
              onMouseMove={(e) => isMousedown && onProgressClick(e)}
              onMouseDown={onProgressMouseDown}
              onMouseUp={onProgressMouseUp}
            ></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formattedTimeLeft ? formattedTimeLeft : ''}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onTogglePlayClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movie.title}</div>

          <button type="button" className="player__full-screen" onClick={onFullscreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviePlayer;
