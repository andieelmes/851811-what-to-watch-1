import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCardList from 'components/movie-card-list/movie-card-list.jsx';

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
  it(`should receive active card id on card hover`, () => {
    const movieCardList = mount(<MovieCardList
      movies={movies}
    />);

    expect(movieCardList.state(`activeCardId`)).toBe(null);

    const movieCard = movieCardList.find(`[data-movie-id=1]`);

    movieCard.simulate(`mouseenter`);
    expect(movieCardList.state(`activeCardId`)).toBe(1);

    movieCard.simulate(`mouseleave`);
    expect(movieCardList.state(`activeCardId`)).toBe(null);
  });
});
