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

    this.VIDEO_TIMEOUT = 1000;
  }

  getVideoStatus() {
    return this.props.active
      ? setTimeout(() => {
        this.setState({active: !this.state.isLoading && this.props.active});
      }, this.VIDEO_TIMEOUT)
      : this.setState({active: !this.state.isLoading && this.props.active});
  }

  componentDidMount() {
    const {preview} = this.props;
    const video = this._videoRef.current;

    video.src = preview;

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    this.getVideoStatus();

    if (this.state.active) {
      video.currentTime = 0;
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.src = ``;
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
        style={this.state.active ? containerStyles : null}
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
