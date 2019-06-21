import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from 'App/components/genre-list/genre-list';

import {MOVIES} from 'App/mocks/movies';
import {
  ALL_GENRES
} from "App/movie-variables";

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
          />,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
