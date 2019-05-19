import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from 'components/video-player/video-player.jsx';

const videoPlayerProps = {
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  active: true,
};

describe(`Video player component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <VideoPlayer
            {...videoPlayerProps}
          />, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
