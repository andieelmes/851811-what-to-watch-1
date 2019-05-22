import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || `Component`;
}

const withActiveItem = (Component, defaultActiveItem = null) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this._handleChange = this._handleChange.bind(this);
      this.state = {
        activeItem: defaultActiveItem,
      };
    }

    render() {
      return <Component activeItem={this.state.activeItem} onChange={this._handleChange} {...this.props}/>;
    }

    _handleChange(value) {
      this.setState({
        activeItem: value
      });
    }
  }

  WrappedComponent.displayName = `withActiveItem(${getDisplayName(Component)})`;

  return WrappedComponent;
};

export default withActiveItem;
