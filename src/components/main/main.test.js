import React from 'react';
import renderer from 'react-test-renderer';
import Main from 'components/main/main.jsx';

import {MOVIES} from 'mocks/movies';

it(`Main component renders correctly`, () => {
  const tree = renderer
    .create(
        <Main
          movies={MOVIES}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
