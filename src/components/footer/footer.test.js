import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Footer from 'App/components/footer/footer';

describe(`Footer component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Footer/>
          </BrowserRouter>,
          {createNodeMock: (el) => el}
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
