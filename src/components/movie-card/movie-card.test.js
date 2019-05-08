import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from 'components/movie-card/movie-card.jsx';

const movie = {
  id: 1,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

describe(`Movie card component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <MovieCard
            {...movie}
            onHover={() => {}}
            onClick={() => {}}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
