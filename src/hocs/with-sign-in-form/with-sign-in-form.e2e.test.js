import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import withSignInForm from 'App/hocs/with-sign-in-form/with-sign-in-form';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
  USER: {
    name: `1`,
    avatar: `img.png`,
    isAuthorizationRequired: false,
  }
};

Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => (
  <div>
    <input type="email" value={props.email} onChange={props.onEmailChange}/>
  </div>
);

MockComponent.propTypes = {
  onEmailChange: PropTypes.func,
  email: PropTypes.string,
};

const MockComponentWrapped = withSignInForm(MockComponent);

describe(`withSignInForm HOC`, () => {
  const emailChangeHandler = jest.fn();
  const passwordChangeHandler = jest.fn();
  const formSubmitHandler = jest.fn();

  it(`should update state on input change`, () => {
    const wrappedComponent = shallow(
        <MockComponentWrapped
          onEmailChange={emailChangeHandler}
          onPasswordChange={passwordChangeHandler}
          onFormSubmit={formSubmitHandler}
          email=''
          password=''
          error=''
          isSubmitting={false}
          store={mockStore(storeStateMock)}
        />
    );

    expect(wrappedComponent.dive().state(`email`)).toEqual(``);

    const email = wrappedComponent.dive().find(MockComponent).dive().find(`input[type="email"]`);

    email.simulate(`change`, {
      target: {value: `1`}
    });

    expect(emailChangeHandler).toHaveBeenCalledWith({
      target: {value: `1`}
    });

    setTimeout(() => {
      expect(wrappedComponent.dive().state(`email`)).toEqual(`1`);
    }, 0);
  });
});
