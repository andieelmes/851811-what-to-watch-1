import React from 'react';
import renderer from 'react-test-renderer';
import {App} from 'components/app/app.jsx';

import {MOVIES, GENRES} from 'mocks/movies';

describe(`App component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<App
        movies={MOVIES}
        genres={GENRES}
        onGenreClick={() => {}}
      />, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
