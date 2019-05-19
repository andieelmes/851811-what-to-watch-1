import React from 'react';
import renderer from 'react-test-renderer';
import Main from 'components/main/main.jsx';

import {MOVIES} from 'mocks/movies';

describe(`Main component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <Main
            movies={MOVIES}
          />, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
