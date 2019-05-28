import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SignIn} from 'components/sign-in/sign-in.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Sign in component`, () => {
  const submitHandler = jest.fn();
  const historyPushHandler = jest.fn();

  it(`should update state on input change`, () => {
    const signIn = shallow(<SignIn
      history={{
        push: historyPushHandler
      }}
      onSubmit={submitHandler}
    />);

    const email = signIn.find(`input[type="email"]`);

    email.simulate(`change`, {
      target: {value: `1`}
    });

    expect(signIn.state(`email`)).toEqual(`1`);
  });

  it(`should submit password and email`, () => {
    const signIn = shallow(<SignIn
      history={{
        push: historyPushHandler
      }}
      onSubmit={submitHandler}
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

    expect(submitHandler).toHaveBeenCalledWith({email: `1`, password: `2`});
  });

  it(`should route to the main page after form submit`, () => {
    const signIn = shallow(<SignIn
      history={{
        push: historyPushHandler
      }}
      onSubmit={submitHandler}
    />);

    const form = signIn.find(`form`);

    form.simulate(`submit`, {
      preventDefault() {}
    });

    expect(historyPushHandler).toHaveBeenCalledWith(`/`);
  });
});