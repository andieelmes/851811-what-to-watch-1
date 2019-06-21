import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import MovieCardList from 'App/components/movie-card-list/movie-card-list';

const movies = [
  {
    id: 1,
    img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
  },
  {
    id: 2,
    img: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    title: `Bohemian Rhapsody`,
  },
];

describe(`Movie card list component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <MovieCardList
              movies={movies}
              onChange={() => {}}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
