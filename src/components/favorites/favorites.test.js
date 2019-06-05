import React from 'react';
import renderer from 'react-test-renderer';
import Favorites from 'components/favorites/favorites';

describe(`Favorites component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<Favorites/>, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
