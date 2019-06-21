import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SignIn} from 'App/components/sign-in/sign-in';

Enzyme.configure({adapter: new Adapter()});

import {USER} from 'App/mocks/user';

describe(`Sign in component`, () => {
  const submitHandler = jest.fn();
  const historyGobackHandler = jest.fn();

  it(`should update state on input change`, () => {
    const signIn = shallow(
        <SignIn
          history={{
            goBack: jest.fn()
          }}
          handleSubmit={submitHandler}
          getLogin={() => {}}
          user={USER}
        />
    );

    const email = signIn.find(`input[type="email"]`);

    email.simulate(`change`, {
      target: {value: `1`}
    });

    expect(signIn.state(`email`)).toEqual(`1`);
  });

  it(`should submit password and email, and pass success and error callbacks`, () => {
    const signIn = shallow(
        <SignIn
          history={{
            goBack: historyGobackHandler
          }}
          handleSubmit={submitHandler}
          getLogin={() => {}}
          user={USER}
        />
    );

    signIn.instance()._displayError = jest.fn();

    const email = signIn.find(`input[type="email"]`);
    const password = signIn.find(`input[type="password"]`);
    const form = signIn.find(`form`);

    email.simulate(`change`, {
      target: {value: `qwerty@.google.c`}
    });
    password.simulate(`change`, {
      target: {value: `2`}
    });
    form.simulate(`submit`, {
      preventDefault() {}
    });

    expect(submitHandler).toHaveBeenCalledWith({email: `qwerty@.google.c`, password: `2`}, historyGobackHandler, signIn.instance()._displayError);
  });
});
