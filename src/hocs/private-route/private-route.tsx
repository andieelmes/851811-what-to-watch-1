import * as React from "react";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "App/reducer/user/selectors";

import {getDisplayName} from 'App/utils';

interface State {
  authorized: boolean,
  history: {push: () => void},
}

const privateRoute = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  class WrappedComponent extends React.Component<P, State> {
    static readonly displayName = `privateRoute(${getDisplayName(Component)})`;

    componentDidUpdate() {
      if (!this.props.authorized) {
        this.props.history.push(`/login`);
      }
    }
    render() {
      return <Component {...this.props}/>;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
      authorized: getAuthorizationStatus(state),
    });
  };

  const connectedWrappedComponent = connect(mapStateToProps)(WrappedComponent);

  return connectedWrappedComponent;
};

export default privateRoute;
