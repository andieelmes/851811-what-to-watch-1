import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from 'components/movie-card/movie-card.jsx';

const movie = {
  id: 1,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
};

Enzyme.configure({adapter: new Adapter()});

describe(`Movie card component`, () => {
  let movieCard;
  const hoverHandler = jest.fn();
  const clickHandler = jest.fn();

  beforeEach(() => {
    movieCard = shallow(<MovieCard
      {...movie}
      onHover={hoverHandler}
      onClick={clickHandler}
    />);

  });

  it(`should receive active card id on play button click`, () => {
    const playButton = movieCard.find(`button`);

    playButton.simulate(`click`);

    expect(clickHandler).toHaveBeenCalledWith(1);
  });

  it(`should receive active card id on hover`, () => {
    movieCard.simulate(`mouseenter`);

    expect(hoverHandler).toHaveBeenCalledWith(1);
  });
});
