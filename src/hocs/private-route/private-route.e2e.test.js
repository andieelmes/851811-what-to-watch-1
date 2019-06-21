import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import privateRoute from 'App/hocs/private-route/private-route';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = privateRoute(MockComponent);

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
  USER: {
    name: `1`,
    avatar: `img.png`,
    isAuthorizationRequired: true,
  }
};

describe(`private HOC`, () => {
  it(`should set auth state`, () => {
    const wrappedComponent = shallow(
        <MockComponentWrapped
          store={mockStore(storeStateMock)}
        />
    ).dive();

    expect(wrappedComponent.props().authorized).toEqual(false);
  });
});
