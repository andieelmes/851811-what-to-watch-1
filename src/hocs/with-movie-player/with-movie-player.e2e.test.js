import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withMoviePlayer from 'App/hocs/with-movie-player/with-movie-player';
import MoviePlayer from 'App/components/movie-player/movie-player';

import {MOVIES} from 'App/mocks/movies';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withMoviePlayer(MockComponent);

describe(`withActivePlayer HOC`, () => {
  it(`should change activeItem on onChange callback`, () => {
    const wrappedComponent = mount(
        <MockComponentWrapped
          moviePlayerContent={MOVIES[0]}
        />
    );

    expect(wrappedComponent.find(MoviePlayer).length).toBe(0);
    expect(wrappedComponent.find(MockComponent).length).toBe(1);

    wrappedComponent.setState({videoPlayerIsActive: true});

    expect(wrappedComponent.find(MoviePlayer).length).toBe(1);
    expect(wrappedComponent.find(MockComponent).length).toBe(0);

  });
});
