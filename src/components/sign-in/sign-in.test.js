import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {SignIn} from 'App/components/sign-in/sign-in';

describe(`Sign in component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<BrowserRouter>
        <SignIn
          onSubmit={() => {}}
          getLogin={() => {}}
          history={{
            push: () => {}
          }}
        /></BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
