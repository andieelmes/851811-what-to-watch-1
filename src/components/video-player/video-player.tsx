import * as React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  img: string,
  preview: string,
  title: string,
  active: boolean,
  id: number,
};

interface State {
  active: boolean,
  isLoading: boolean,
};

class VideoPlayer extends React.PureComponent<Props, State> {
  _videoRef: React.RefObject<HTMLVideoElement>;
  videoTimeout: NodeJS.Timer;
  VIDEO_TIMEOUT_DELAY: number;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      isLoading: true,
      active: false,
    };

    this._getVideoStatus = this._getVideoStatus.bind(this);
    this.videoTimeout = null;
    this.VIDEO_TIMEOUT_DELAY = 1000;
  }

  componentDidMount() {
    const {preview} = this.props;
    const video = this._videoRef.current;

    video.src = preview;

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.active !== this.props.active) {
      this._getVideoStatus();
    }

    if (prevState.active !== this.state.active) {
      const video = this._videoRef.current;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (this.state.active) {
            video.currentTime = 0;
          } else {
            video.pause();
          }
        })
        .catch((error) => {
          throw error;
        });
      }
    }
  }


  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.src = ``;

    clearTimeout(this.videoTimeout);
  }

  render() {
    const {
      img,
      title,
      id,
    } = this.props;

    const containerStyles: React.CSSProperties = {
      display: `block`,
    };

    const activeContainerStyles: React.CSSProperties = {
      display: `block`,
      position: `relavive` as `relative`,
      zIndex: 3,
    };

    const videoPlayerStyles: React.CSSProperties = {
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
        style={this.props.active ? activeContainerStyles : containerStyles}
      >
        <img
          src={img}
          alt={title}
          width="280"
          height="175"
          style={this.state.active ? hiddenStyles : null}
        />
        <video
          poster={img}
          ref={this._videoRef}
          muted={true}
          controls={true}
          loop={true}
          style={this.state.active ? videoPlayerStyles : hiddenStyles}
        />
      </Link>
    );
  }

  _getVideoStatus() {
    if (this.props.active) {
      this.videoTimeout = setTimeout(() => {
        this.setState({active: !this.state.isLoading && this.props.active});
      }, this.VIDEO_TIMEOUT_DELAY);
    } else {
      this.setState({active: !this.state.isLoading && this.props.active});
    }
  }
}

export default VideoPlayer;
