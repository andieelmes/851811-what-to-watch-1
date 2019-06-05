import * as React from 'react';
import {connect} from "react-redux";
import {Operation} from "reducer/user/user";

interface Props {
  onSubmit: ({}: State, callback: () => void) => void,
  history: {goBack: () => void},
  getLogin: () => void,
};

interface State {
  email: string,
  password: string,
};

class SignIn extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getLogin();
  }

  onEmailChange({target: {value}}) {
    this.setState({
      email: value
    });
  }

  onPasswordChange({target: {value}}) {
    this.setState({
      password: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      onSubmit,
      history
    } = this.props;
    onSubmit({email: this.state.email, password: this.state.password}, history.goBack);
  }

  render() {
    const {
      email,
      password,
    } = this.state;

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
          <form action="#" className="sign-in__form" onSubmit={this.onSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" value={email} onChange={this.onEmailChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" value={password} onChange={this.onPasswordChange}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export {SignIn};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({email, password}, callback) => {
    dispatch(Operation.postLogin(email, password, callback));
  },
  getLogin: () => {
    dispatch(Operation.getLogin());
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
