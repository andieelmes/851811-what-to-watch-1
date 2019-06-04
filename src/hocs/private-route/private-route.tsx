import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAuthorizationStatus} from "reducer/user/selectors";

import {getDisplayName} from 'utils';

const privateRoute = (Component) => {
  const propTypes = {
    authorized: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  class WrappedComponent extends React.Component {
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

  WrappedComponent.propTypes = propTypes;
  WrappedComponent.displayName = `privateRoute(${getDisplayName(Component)})`;

  const connectedWrappedComponent = connect(mapStateToProps)(WrappedComponent);

  return connectedWrappedComponent;
};

export default privateRoute;
