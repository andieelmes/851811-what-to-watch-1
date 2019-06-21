import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import PreviewPlayer from 'App/components/preview-player/preview-player';

const PreviewPlayerProps = {
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  active: true,
};

describe(`Preview player component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <PreviewPlayer
              {...PreviewPlayerProps}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
