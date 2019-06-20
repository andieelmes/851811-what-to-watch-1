import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Favorites from 'App/components/favorites/favorites';

import {USER} from 'App/mocks/user';
import {MOVIES} from 'App/mocks/movies';

describe(`Favorites component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<BrowserRouter><Favorites user={USER} movies={MOVIES}/></BrowserRouter>, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
