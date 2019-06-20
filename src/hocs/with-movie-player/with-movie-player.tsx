import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';
import MoviePlayer from 'App/components/movie-player/movie-player';

import { Movie as MovieType } from 'App/types';

interface State {
  videoPlayerIsActive: boolean,
}

interface Props {
  moviePlayerContent: MovieType,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  onPlay: () => void
}

const withMoviePlayer = (Component) => {
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
    static readonly displayName = `withMoviePlayer(${getDisplayName(Component)})`;

    constructor(props) {
      super(props);

      this.state = {
        videoPlayerIsActive: false,
      };

      this._showPlayer = this._showPlayer.bind(this);
      this._hidePlayer = this._hidePlayer.bind(this);
    }

    render() {
      return (
        <>
          { this.state.videoPlayerIsActive
            ? <MoviePlayer movie={this.props.moviePlayerContent} onExit={this._hidePlayer}/>
            : <Component onPlay={this._showPlayer} {...this.props}/>
          }
        </>
      );
    }

    private _showPlayer() {
      this.setState({
        videoPlayerIsActive: true,
      })
    }

    private _hidePlayer() {
      this.setState({
        videoPlayerIsActive: false,
      })
    }
  }

  return WrappedComponent;
};

export default withMoviePlayer;
