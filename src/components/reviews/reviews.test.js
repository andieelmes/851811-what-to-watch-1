import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Reviews from 'App/components/reviews/reviews';

import {REVIEWS} from 'App/mocks/movies';

describe(`Review component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Reviews
              reviews={REVIEWS}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
