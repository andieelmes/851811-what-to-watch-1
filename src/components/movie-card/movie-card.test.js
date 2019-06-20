import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import MovieCard from 'App/components/movie-card/movie-card';

const movie = {
  id: 1,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

describe(`Movie card component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<BrowserRouter>
        <MovieCard
          {...movie}
          onHover={() => {}}
        /></BrowserRouter>, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
