import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  img: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      isLoading: true,
      active: false,
    };

    this.getVideoStatus = this.getVideoStatus.bind(this);
    this.videoTimeout = null;
    this.VIDEO_TIMEOUT_DELAY = 1000;
  }

  getVideoStatus() {
    if (this.props.active) {
      this.videoTimeout = setTimeout(() => {
        this.setState({active: !this.state.isLoading && this.props.active});
      }, this.VIDEO_TIMEOUT_DELAY);
    } else {
      this.setState({active: !this.state.isLoading && this.props.active});
    }
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
      this.getVideoStatus();
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
    } = this.props;

    const containerStyles = {
      position: `relavive`,
      zIndex: 3,
    };

    const videoPlayerStyles = {
      position: `relative`,
      zIndex: 2,
      objectFit: `cover`,
      maxWidth: `100%`,
      height: `100%`,
    };

    const hiddenStyles = {
      display: `none`,
    };

    return (
      <div
        className="small-movie-card__image"
        style={this.props.active ? containerStyles : null}
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
      </div>
    );
  }
}

VideoPlayer.propTypes = propTypes;

export default VideoPlayer;
