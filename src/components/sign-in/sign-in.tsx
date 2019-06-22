import * as React from 'react';
import { connect } from "react-redux";
import { Operation } from "App/reducer/user/user";
import { Link } from 'react-router-dom';
import Footer from 'App/components/footer/footer';

interface Props {
  history: {goBack: () => void},
  getLogin: () => void,
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
  email: string,
  password: string,
  error: string,
  isSubmitting: boolean,
  onEmailChange: () => void,
  onPasswordChange: () => void,
  displayError: () => void,
  onFormSubmit: () => void,
};

class SignIn extends React.PureComponent<Props> {
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
      onEmailChange,
      onPasswordChange,
      onFormSubmit,
    } = this.props;

    const isValid = email.length && password.length;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={onFormSubmit}>
            { error && (
              <div className="sign-in__message">
                <p>{error}</p>
              </div>
            )}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" value={email} onChange={onEmailChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" value={password} onChange={onPasswordChange}/>
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
}

export {SignIn};

const mapDispatchToProps = (dispatch) => ({
  getLogin: () => {
    dispatch(Operation.getLogin());
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
