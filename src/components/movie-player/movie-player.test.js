import React from 'react';
import renderer from 'react-test-renderer';
import MoviePlayer from 'App/components/movie-player/movie-player';

import {MOVIES} from 'App/mocks/movies';

describe(`Movie player component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <MoviePlayer
            movie={MOVIES[0]}
            onExit={() => {}}
          />,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
