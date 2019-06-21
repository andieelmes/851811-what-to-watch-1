import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Movie} from 'App/components/movie/movie';

import {MOVIES} from 'App/mocks/movies';
import {USER} from 'App/mocks/user';

describe(`Movie component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Movie
              movie={MOVIES[0]}
              similar={MOVIES}
              onChange={() => {}}
              toggleFavorite={() => {}}
              onPlay={() => {}}
              onLoad={() => {}}
              user={USER}
              activeItem=''
              reviews={[]}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
