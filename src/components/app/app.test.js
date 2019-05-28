import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {App} from 'components/app/app.jsx';

import {MOVIES, GENRES} from 'mocks/movies';

describe(`App component`, () => {
  it(`should render correctly when authorized`, () => {
    const tree = renderer
      .create(<BrowserRouter>
        <App
          movies={MOVIES}
          genres={GENRES}
          onGenreClick={() => {}}
          user={{
            authorized: true,
            avatar: ``,
          }}
        />
      </BrowserRouter>, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly for guests`, () => {
    const tree = renderer
      .create(<BrowserRouter>
        <App
          movies={MOVIES}
          genres={GENRES}
          onGenreClick={() => {}}
          user={{
            authorized: false,
            avatar: ``,
          }}
        />
      </BrowserRouter>, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
