import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withMoviePlayerFunctionality from 'App/hocs/with-movie-player-functionality/with-movie-player-functionality';

import {MOVIES} from 'App/mocks/movies';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => (
  <div>
    <video
      ref={props.forwardedVideoRef}
      onTimeUpdate={props.onTimeUpdate}
    />
    <progress
      className="player__progress"
      value={props.progress}
      ref={props.forwardedProgressRef}
      onClick={props.onProgressClick}
    ></progress>
  </div>
);

MockComponent.propTypes = {
  forwardedVideoRef: PropTypes.ref,
  forwardedProgressRef: PropTypes.ref,
  progress: PropTypes.number,
  onTimeUpdate: PropTypes.func,
  onProgressClick: PropTypes.func,
};

const MockComponentWrapped = withMoviePlayerFunctionality(MockComponent);

describe(`withMoviePlayerFunctionality HOC`, () => {
  const timeUpdateHandler = jest.fn();
  const progressClickHandler = jest.fn();

  function mockGetRef() {
    // eslint-disable-next-line no-invalid-this
    this.contentRef = {src: ``};
  }

  it(`should update progress and time left on video update`, () => {
    const spy = jest.spyOn(MockComponentWrapped.prototype, `componentDidMount`).mockImplementationOnce(mockGetRef);

    const wrappedComponent = shallow(
        <MockComponentWrapped
          progress={0}
          onTimeUpdate={timeUpdateHandler}
          onProgressClick={progressClickHandler}
          movie={MOVIES[0]}
        />
    );

    expect(spy).toHaveBeenCalled();

    expect(wrappedComponent.state(`progress`)).toEqual(0);
    expect(wrappedComponent.state(`timeLeft`)).toEqual(0);

    const video = wrappedComponent.find(MockComponent).dive().find(`video`);

    video.currentTime = 100;

    setTimeout(() => {
      expect(wrappedComponent.state(`progress`)).toEqual(100);
      expect(wrappedComponent.state(`timeLeft`)).toEqual(0);
    }, 0);
  });

  it(`should get correct formatted time`, () => {
    const spy = jest.spyOn(MockComponentWrapped.prototype, `componentDidMount`).mockImplementationOnce(mockGetRef);

    const wrappedComponent = shallow(
        <MockComponentWrapped
          progress={0}
          onTimeUpdate={timeUpdateHandler}
          onProgressClick={progressClickHandler}
          movie={MOVIES[0]}
        />
    );

    expect(spy).toHaveBeenCalled();

    const formattedTime = wrappedComponent.instance()._getFormattedTimeLeft(887);

    expect(formattedTime).toEqual(`00:14:47`);
  });
});
