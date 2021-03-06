import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCardList from 'App/components/movie-card-list/movie-card-list';
import MovieCard from 'App/components/movie-card/movie-card';

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

Enzyme.configure({adapter: new Adapter()});

describe(`Movie card list component`, () => {
  const changeHandler = jest.fn();

  it(`should receive active card id on card hover`, () => {
    const movieCardList = shallow(
        <MovieCardList
          movies={movies}
          onChange={changeHandler}
        />
    );

    const movieCard = movieCardList.find(MovieCard).at(0).dive().find(`[data-movie-id=1]`);

    movieCard.simulate(`mouseenter`);
    expect(changeHandler).toHaveBeenCalledWith(1);

    movieCard.simulate(`mouseleave`);
    expect(changeHandler).toHaveBeenCalledWith(null);
  });
});
