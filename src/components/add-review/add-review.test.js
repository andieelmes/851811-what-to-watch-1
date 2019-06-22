import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import AddReview from 'App/components/add-review/add-review';

import {MOVIES} from 'App/mocks/movies';
import {USER} from 'App/mocks/user';

describe(`Add review component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <AddReview
              movie={MOVIES[0]}
              user={USER}
              text=''
              rating={3}
              isSubmitting={false}
              onTextChange={() => {}}
              onRatingChange={() => {}}
              onFormSubmit={() => {}}
              onSuccess={() => {}}
              onError={() => {}}
            />
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
