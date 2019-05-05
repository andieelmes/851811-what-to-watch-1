import React from 'react';
import Main from 'components/main/main.jsx';

import {MOVIES} from 'mocks/movies';

const App = () => (
  <Main
    movies={MOVIES}
  />
);

export default App;
