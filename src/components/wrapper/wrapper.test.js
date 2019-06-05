import React from 'react';
import renderer from 'react-test-renderer';
import Wrapper from 'App/components/wrapper/wrapper';

describe(`Wrapper component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Wrapper>
            child
          </Wrapper>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
