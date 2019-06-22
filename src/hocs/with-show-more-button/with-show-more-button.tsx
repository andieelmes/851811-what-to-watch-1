import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';

interface State {
  show: number,
  increase: number,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  onShowMoreClick: () => void
}

const withShowMoreButton = (Component) => {
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
    static readonly displayName = `withShowMoreButton(${getDisplayName(Component)})`;

    constructor(props) {
      super(props);

      this.state = {
        show: this.props.show,
        increase: this.props.increase || 3,
      };

      this._handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    }

    render() {
      return <Component {...this.props} movies={this.props.movies.slice(0, this.state.show)}>
        { (this.props.movies.length > this.state.show) && (
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={this._handleMoreButtonClick}>Show more</button>
          </div>
        )}
      </Component>;
    }

    private _handleMoreButtonClick() {
      this.setState({
        show: this.state.show + this.state.increase,
      })
    }
  }

  return WrappedComponent;
};

export default withShowMoreButton;
