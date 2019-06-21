import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {App} from 'App/components/app/app';

import {MOVIES, GENRES} from 'App/mocks/movies';

describe(`App component`, () => {
  it(`should render correctly when authorized`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <App
              movies={MOVIES}
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
            <App
              movies={MOVIES}
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
