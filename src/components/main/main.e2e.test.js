import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from 'components/main/main.jsx';

import {MOVIES} from 'mocks/movies';

Enzyme.configure({adapter: new Adapter()});

it(`Main page correctly renders`, () => {
  const clickHandler = jest.fn();
  const main = shallow(<Main
    movies={MOVIES}
    onClick={clickHandler}
  />);

  const movieTitleLink = main.find(`.small-movie-card__link`).at(0);

  movieTitleLink.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
