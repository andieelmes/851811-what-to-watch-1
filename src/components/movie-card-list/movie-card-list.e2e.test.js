import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

Enzyme.configure({adapter: new Adapter()});

describe(`Movie card list component`, () => {
  it(`should receive active card id on card hover`, () => {
    const movieCardList = mount(<MovieCardList
      movies={movies}
    />);

    expect(movieCardList.state(`activeCardId`)).toBe(null);

    const movieCard = movieCardList.find(`#bohemian-rhapsody`);

    movieCard.simulate(`mouseenter`);
    expect(movieCardList.state(`activeCardId`)).toBe(`bohemian-rhapsody`);

    movieCard.simulate(`mouseleave`);
    expect(movieCardList.state(`activeCardId`)).toBe(null);
  });
});
