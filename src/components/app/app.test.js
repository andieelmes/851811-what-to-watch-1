import React from 'react';
import renderer from 'react-test-renderer';
import App from 'components/app/app.jsx';

describe(`App component`, () => {
  it(`should render correctly`, () => {
    const tree = renderer
      .create(<App/>, {createNodeMock: (el) => el})
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
