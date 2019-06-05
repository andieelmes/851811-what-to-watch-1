import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SignIn} from 'App/components/sign-in/sign-in';

Enzyme.configure({adapter: new Adapter()});

describe(`Sign in component`, () => {
  const submitHandler = jest.fn();
  const historyGobackHandler = jest.fn();

  it(`should update state on input change`, () => {
    const signIn = shallow(<SignIn
      history={{
        goBack: jest.fn()
      }}
      onSubmit={submitHandler}
      getLogin={() => {}}
    />);

    const email = signIn.find(`input[type="email"]`);

    email.simulate(`change`, {
      target: {value: `1`}
    });

    expect(signIn.state(`email`)).toEqual(`1`);
  });

  it(`should submit password and email, and pass go back callback`, () => {
    const signIn = shallow(<SignIn
      history={{
        goBack: historyGobackHandler
      }}
      onSubmit={submitHandler}
      getLogin={() => {}}
    />);

    const email = signIn.find(`input[type="email"]`);
    const password = signIn.find(`input[type="password"]`);
    const form = signIn.find(`form`);

    email.simulate(`change`, {
      target: {value: `1`}
    });
    password.simulate(`change`, {
      target: {value: `2`}
    });
    form.simulate(`submit`, {
      preventDefault() {}
    });

    expect(submitHandler).toHaveBeenCalledWith({email: `1`, password: `2`}, historyGobackHandler);
  });
});
