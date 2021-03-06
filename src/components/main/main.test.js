import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Main} from 'App/components/main/main';

import {MOVIES, GENRES} from 'App/mocks/movies';

describe(`Main component`, () => {
  it(`should render correctly when authorized`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Main
              movies={MOVIES}
              promo={MOVIES[0]}
              genres={GENRES}
              onGenreClick={() => {}}
              user={{
                authorized: true,
                avatar: ``,
                name: `name`,
              }}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly for guests`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Main
              movies={MOVIES}
              promo={MOVIES[0]}
              genres={GENRES}
              onGenreClick={() => {}}
              user={{
                authorized: false,
              }}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
