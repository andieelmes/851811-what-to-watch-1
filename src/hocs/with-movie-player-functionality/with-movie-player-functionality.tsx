import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';

interface State {
  isLoading: boolean,
  isPlaying: boolean,
  isFullscreen: boolean,
  progress: number,
  timeLeft: number,
  height: number,
  isMousedown: boolean,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  forwardedVideoRed: React.RefObject<HTMLVideoElement>,
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
}

const withMoviePlayerFunctionality = (Component) => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;

  // Вычисляем реальные пропсы, которые нужно передать снаружи в обернутый компонент.
  // P - пропсы компонента, InjectedProps - добавляемые хоком пропсы.
  // T - пропсы, которые нужно передать в обернутый хоком компонент.
  // Условно: T = P - InjectedProps
  // Например: P = {foo: string, bar: string}, InjectedProps = {bar: string}
  // Тогда: T = {foo: string}
  type T = Subtract<P, InjectedProps>;

  class WrappedComponent extends React.Component<T, State> {
    static readonly displayName = `withMoviePlayerFunctionality(${getDisplayName(Component)})`;
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
      this._getFormattedTimeLeft = this._getFormattedTimeLeft.bind(this);
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
        progress,
        timeLeft,
        isPlaying,
        height,
        isFullscreen,
        isMousedown
      } = this.state;

      return (
        <Component
          forwardedVideoRef={this._videoRef}
          forwardedProgressRef={this._progressRef}
          formattedTimeLeft={this._getFormattedTimeLeft(timeLeft)}
          progress={progress}
          isPlaying={isPlaying}
          height={height}
          isFullscreen={isFullscreen}
          isMousedown={isMousedown}
          onTimeUpdate={this._handleUpdate}
          onProgressClick={this._handleScrub}
          onProgressMouseDown={this._handleMouseDown}
          onProgressMouseUp={this._handleMouseUp}
          onTogglePlayClick={this._togglePlay}
          onFullscreenClick={this._setFullscreen}
          {...this.props}
        />
      )
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

    private _getFormattedTimeLeft(timeLeft: number) {
      return WrappedComponent._getFormattedTime(timeLeft)
    }

    static _padNumber(number: number) {
      return number < 10 ? `0${number}` : number
    }

    static _getFormattedTime(time: number) {
      if (!time) return undefined;

      const minutes = Math.floor(time / 60);
      const hours = Math.floor(time / (60 * 60));
      const seconds = Math.floor(time - +(hours * 60 * 60) - +(minutes * 60));

      return `${hours ? `${WrappedComponent._padNumber(hours)}` : '00'}:${minutes ? `${WrappedComponent._padNumber(minutes)}` : '00'}:${WrappedComponent._padNumber(seconds)}`;
    }
  }

  return WrappedComponent;
};

export default withMoviePlayerFunctionality;
