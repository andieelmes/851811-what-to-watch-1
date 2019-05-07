import React from 'react';
import renderer from 'react-test-renderer';
import MovieCardList from 'components/movie-card-list/movie-card-list.jsx';

const movies = [
  {
    id: `fantastic-beasts-the-crimes-of-grindelwald`,
    img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
  },
  {
    id: `bohemian-rhapsody`,
    img: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
  },
];

describe(`Movie card list component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <MovieCardList
            movies={movies}
          />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
