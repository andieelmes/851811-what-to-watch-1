import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';
import { connect } from "react-redux";
import { Operation } from "App/reducer/user/user";

interface State {
  email: string,
  password: string,
  error: string,
  isSubmitting: boolean,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  onEmailChange: () => void,
  onPasswordChange: () => void,
  onFormSubmit: () => void,
  email: string,
  password: string,
  error: string,
  isSubmitting: boolean,
}

interface Props {
  handleSubmit: ({}: { email: string, password: string}, onSuccess: () => void, onError: (string) => void) => void,
  history: {push: (string) => void},
};

const withSignInForm = (Component) => {
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
    static readonly displayName = `withSignInForm(${getDisplayName(Component)})`;

    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        error: ``,
        isSubmitting: false,
      };

      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
      this._displayError = this._displayError.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    render() {
      return <Component
        onEmailChange={this._handleEmailChange}
        onPasswordChange={this._handlePasswordChange}
        onFormSubmit={this._handleFormSubmit}
        email={this.state.email}
        password={this.state.password}
        error={this.state.error}
        isSubmitting={this.state.isSubmitting}
        {...this.props}
      />;
    }

    private _handleEmailChange({target: {value}}) {
      this.setState({
        email: value
      });
    }

    private _handlePasswordChange({target: {value}}) {
      this.setState({
        password: value
      });
    }

    private _displayError(error) {
      this.setState({
        error: error.response.data.error.match(/\[(.*?)]/)[1],
        isSubmitting: false,
      });
    }

    private _handleFormSubmit(e) {
      e.preventDefault();

      const {
        handleSubmit,
        history
      } = this.props;

      this.setState({ isSubmitting: true })

      return handleSubmit({email: this.state.email, password: this.state.password}, history.goBack, this._displayError);
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    handleSubmit: ({email, password}, onSuccess, onError) => {
      dispatch(Operation.postLogin(email, password, onSuccess, onError));
    },
  });

  const connectedWrappedComponent = connect(null, mapDispatchToProps)(WrappedComponent);

  return connectedWrappedComponent;
};

export default withSignInForm;
