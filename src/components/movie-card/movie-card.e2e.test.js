import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from 'App/components/movie-card/movie-card';

const movie = {
  id: 1,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

Enzyme.configure({adapter: new Adapter()});

describe(`Movie card component`, () => {
  let movieCard;
  const hoverHandler = jest.fn();

  beforeEach(() => {
    movieCard = shallow(<MovieCard
      {...movie}
      onHover={hoverHandler}
    />);

  });

  it(`should receive active card id on hover`, () => {
    movieCard.simulate(`mouseenter`);

    expect(hoverHandler).toHaveBeenCalledWith(1);
  });
});
