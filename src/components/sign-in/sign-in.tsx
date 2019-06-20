import * as React from 'react';
import { connect } from "react-redux";
import { Operation } from "App/reducer/user/user";
import Footer from 'App/components/footer/footer';

interface Props {
  onSubmit: ({}: { email: string, password: string}, onSuccess: () => void, onError: (string) => void) => void,
  history: {goBack: () => void},
  getLogin: () => void,
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
};

interface State {
  email: string,
  password: string,
  error: string,
  isSubmitting: boolean,
};

class SignIn extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
      error: ``,
      isSubmitting: false,
    };

    this._onEmailChange = this._onEmailChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._displayError = this._displayError.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getLogin();
  }

  componentDidUpdate() {
    const {
      user,
      history
    } = this.props;

    if (user.authorized) history.goBack()
  }

  render() {
    const {
      email,
      password,
      error,
      isSubmitting,
    } = this.state;

    const isValid = email.length && password.length;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._onSubmit}>
            { error && (
              <div className="sign-in__message">
                <p>{error}</p>
              </div>
            )}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" value={email} onChange={this._onEmailChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" value={password} onChange={this._onPasswordChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" disabled={!isValid || isSubmitting}>Sign in</button>
            </div>
          </form>
        </div>

        <Footer/>
      </div>
    );
  }

  _onEmailChange({target: {value}}) {
    this.setState({
      email: value
    });
  }

  _onPasswordChange({target: {value}}) {
    this.setState({
      password: value
    });
  }

  _displayError(error) {
    this.setState({
      error: error.response.data.error.match(/\[(.*?)]/)[1],
      isSubmitting: false,
    });
  }

  _onSubmit(e) {
    e.preventDefault();

    const {
      onSubmit,
      history
    } = this.props;

    this.setState({ isSubmitting: true })

    onSubmit({email: this.state.email, password: this.state.password}, history.goBack, this._displayError);
  }
}

export {SignIn};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({email, password}, onSuccess, onError) => {
    dispatch(Operation.postLogin(email, password, onSuccess, onError));
  },
  getLogin: () => {
    dispatch(Operation.getLogin());
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
