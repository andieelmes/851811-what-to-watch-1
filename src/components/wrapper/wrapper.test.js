import React from 'react';
import renderer from 'react-test-renderer';
import Wrapper from 'components/wrapper/wrapper.tsx';

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
