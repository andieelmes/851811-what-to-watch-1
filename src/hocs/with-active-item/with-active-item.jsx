import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || `Component`;
}

const withActiveItem = (Component, defaultActiveItem = null) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        activeItem: defaultActiveItem,
      };
    }

    handleChange(value) {
      this.setState({
        activeItem: value
      });
    }

    render() {
      return <Component activeItem={this.state.activeItem} onChange={this.handleChange} {...this.props}/>;
    }
  }

  WrappedComponent.displayName = `withActiveItem(${getDisplayName(Component)})`;

  return WrappedComponent;
};

export default withActiveItem;
