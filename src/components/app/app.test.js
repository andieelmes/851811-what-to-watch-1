import React from 'react';
import renderer from 'react-test-renderer';
import App from 'components/app/app.jsx';

it(`App component renders correctly`, () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
