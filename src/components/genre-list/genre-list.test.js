import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from 'components/genre-list/genre-list.jsx';

import {MOVIES} from 'mocks/movies';
import {
  ALL_GENRES
} from "movie-variables";

const genres = [ALL_GENRES, ...new Set(MOVIES.map((movie) => movie.genre))];

describe(`Genre list component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <GenreList
            movies={MOVIES}
            onChange={() => {}}
            activeItem="comedies"
            genres={genres}
          />, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
