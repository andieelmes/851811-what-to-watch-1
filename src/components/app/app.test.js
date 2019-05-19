import React from 'react';
import renderer from 'react-test-renderer';
import {App} from 'components/app/app.jsx';

import {MOVIES} from 'mocks/movies';

describe(`App component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<App
        movies={MOVIES}
        onGenreClick={() => {}}
      />, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
