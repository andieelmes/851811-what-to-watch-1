import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';

interface State {
  activeItem: string,
}

interface Props {
  onActiveItemChange: () => void,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  activeItem: string,
  onChange: () => string
}

const withActiveItem = (Component) => {
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
    static readonly displayName = `privateRoute(${getDisplayName(Component)})`;

    constructor(props) {
      super(props);

      this.state = {
        activeItem: undefined,
      };

      this._handleChange = this._handleChange.bind(this);
    }

    render() {
      return <Component activeItem={this.state.activeItem} onChange={this._handleChange} {...this.props}/>;
    }

    private _handleChange(value) {
      this.setState({
        activeItem: value
      });

      if (this.props.onActiveItemChange) {
        this.props.onActiveItemChange(value);
      }
    }
  }

  return WrappedComponent;
};

export default withActiveItem;
