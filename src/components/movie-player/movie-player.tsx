import * as React from 'react';

import { Movie as MovieType } from 'App/types';

interface Props {
  movie: MovieType,
  onExit: () => void,
};

interface State {
  isLoading: boolean,
  isPlaying: boolean,
  isFullscreen: boolean,
  progress: number,
  timeLeft: number,
  height: number,
  isMousedown: boolean,
};

class MoviePlayer extends React.PureComponent<Props, State> {
  _videoRef: React.RefObject<HTMLVideoElement>;
  _progressRef: React.RefObject<HTMLProgressElement>;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
    this._progressRef = React.createRef();

    this.state = {
      isLoading: true,
      isPlaying: false,
      isFullscreen: false,
      progress: 0,
      timeLeft: 0,
      height: 0,
      isMousedown: false,
    };

    this._togglePlay = this._togglePlay.bind(this);
    this._setFullscreen = this._setFullscreen.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleScrub = this._handleScrub.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
  }

  componentDidMount() {
    const video = this._videoRef.current;

    video.src = this.props.movie.video;

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    video.onloadedmetadata = () => {
      video.play()

      this.setState({
        timeLeft: Math.floor(video.duration),
        height: video.videoHeight,
        isPlaying: true,
      });
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.src = ``;
  }

  render() {
    const {
      movie,
      onExit,
    } = this.props;

    const {
      progress,
      timeLeft,
      isPlaying,
      height,
      isFullscreen,
      isMousedown
    } = this.state;

    const formattedTimeLeft = MoviePlayer._getFormattedTime(timeLeft)

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
          muted /////revmore
          ref={this._videoRef}
          onTimeUpdate={this._handleUpdate}
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
                ref={this._progressRef}
                onClick={this._handleScrub}
                onMouseMove={(e) => isMousedown && this._handleScrub(e)}
                onMouseDown={this._handleMouseDown}
                onMouseUp={this._handleMouseUp}
              ></progress>
              <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{formattedTimeLeft ? formattedTimeLeft : ''}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={this._togglePlay}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{movie.title}</div>

            <button type="button" className="player__full-screen" onClick={this._setFullscreen}>
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

  private _togglePlay() {
    const video = this._videoRef.current;
    const { isPlaying } = this.state;

    if (!isPlaying) {
      video.play()
      this.setState({
        isPlaying: true,
      })
    }
    else {
      video.pause();
      this.setState({
        isPlaying: false,
      })
    }
  }

  private _setFullscreen() {
    this.setState({
      isFullscreen: !this.state.isFullscreen,
    })
  }

  private _handleUpdate() {
    const video = this._videoRef.current;

    this.setState({
      progress: +((video.currentTime / video.duration) * 100).toFixed(2),
      timeLeft: Math.floor(video.duration - video.currentTime),
    })
  }

  private _handleScrub(e) {
    const video = this._videoRef.current;
    const progressBar = this._progressRef.current;

    const scrubTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * video.duration;

    if (!scrubTime) return

    video.currentTime = scrubTime;
    this._handleUpdate()
  }

  private _handleMouseDown() {
    this.setState({
      isMousedown: true,
    })
  }

  private _handleMouseUp() {
    this.setState({
      isMousedown: false,
    })
  }

  static _padNumber(number: number) {
    return number < 10 ? `0${number}` : number
  }

  static _getFormattedTime(time: number) {
    if (!time) return undefined;

    const minutes = Math.floor(time / 60);
    const hours = Math.floor(time / (60 * 60));
    const seconds = Math.floor(time - +(hours * 60 * 60) - +(minutes * 60));

    return `${hours ? `${MoviePlayer._padNumber(hours)}` : '00'}:${minutes ? `${MoviePlayer._padNumber(minutes)}` : '00'}:${MoviePlayer._padNumber(seconds)}`;
  }
}

export default MoviePlayer;
