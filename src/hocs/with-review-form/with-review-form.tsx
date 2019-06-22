import * as React from "react";
import {Subtract} from "utility-types";
import {getDisplayName} from 'App/utils';
import { connect } from "react-redux";
import { Operation as DataOperation } from "App/reducer/data/data";
import { Operation as UserOperation } from "App/reducer/user/user";

interface State {
  text: string,
  rating: number,
  isSubmitting: boolean,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  onTextChange: () => void,
  onRatingChange: () => void,
  onFormSubmit: () => void,
  onSuccess: () => void,
  onError: () => void,
  text: string,
  rating: number,
  isSubmitting: boolean,
}

interface Props {
  onSubmit: (id: number, {}: { rating: number, comment: string}, onSuccess: () => void, onError: () => void) => void,
  history: {push: (string) => void},
  getLogin: () => void,
};

const withReviewForm = (Component) => {
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
    static readonly displayName = `withReviewForm(${getDisplayName(Component)})`;

    constructor(props) {
      super(props);

      this.state = {
        text: ``,
        rating: 3,
        isSubmitting: false,
      };

      this._handleTextChange = this._handleTextChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleSuccess = this._handleSuccess.bind(this);
      this._handleError = this._handleError.bind(this);
    }

    render() {
      return <Component
        onTextChange={this._handleTextChange}
        onRatingChange={this._handleRatingChange}
        onFormSubmit={this._handleFormSubmit}
        onSuccess={this._handleSuccess}
        onError={this._handleError}
        text={this.state.text}
        rating={this.state.rating}
        isSubmitting={this.state.isSubmitting}
        {...this.props}
      />;
    }

    private _handleTextChange({target: {value}}) {
      this.setState({
        text: value
      });
    }

    private _handleRatingChange({target: {value}}) {
      this.setState({
        rating: +value
      });
    }

    private _handleFormSubmit(e) {
      const {
        onSubmit,
        movie
      } = this.props;

      e.preventDefault();
      this.setState({ isSubmitting: true })

      onSubmit(movie.id, {rating: this.state.rating, comment: this.state.text}, this._handleSuccess, this._handleError);
    }

    private _handleSuccess() {
      this.props.history.push(`/film/${this.props.movie.id}`);
    }

    private _handleError() {
      this.setState({ isSubmitting: false })
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (id, {rating, comment}, onSuccess, onError) => {
      dispatch(DataOperation.postComment(id, rating, comment, onSuccess, onError))
    }
  });

  const connectedWrappedComponent = connect(null, mapDispatchToProps)(WrappedComponent);

  return connectedWrappedComponent;
};

export default withReviewForm;
