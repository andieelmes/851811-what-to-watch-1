import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from 'components/sign-in/sign-in.jsx';

describe(`Sign in component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <SignIn
            onSubmit={() => {}}
            history={{
              push: () => {}
            }}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
