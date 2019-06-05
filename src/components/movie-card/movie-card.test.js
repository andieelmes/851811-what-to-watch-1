import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from 'components/movie-card/movie-card';

const movie = {
  id: 1,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

describe(`Movie card component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <MovieCard
            {...movie}
            onHover={() => {}}
          />, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
