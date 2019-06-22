import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';

interface State {
  active: boolean,
  isLoading: boolean,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  active: boolean,
  forwardedRef: React.RefObject<HTMLVideoElement>
}

const withPreviewPlayerFunctionality = (Component) => {
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
    static readonly displayName = `withPreviewPlayerFunctionality(${getDisplayName(Component)})`;
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
      return <Component
        forwardedRef={this._videoRef}
        {...this.props}
        active={this.state.active}
      />;
    }

  private _getVideoStatus() {
      if (this.props.active) {
        this.videoTimeout = setTimeout(() => {
          this.setState({active: !this.state.isLoading && this.props.active});
        }, this.VIDEO_TIMEOUT_DELAY);
      } else {
        this.setState({active: !this.state.isLoading && this.props.active});
      }
    }
  }

  return WrappedComponent;
};

export default withPreviewPlayerFunctionality;
