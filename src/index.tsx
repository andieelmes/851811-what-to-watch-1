import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";

import App from 'components/app/app.jsx';
import reducer from "./reducer";
import {Operation as DataOperation} from "reducer/data/data";
import {Operation as UserOperation} from "reducer/user/user";
import {createAPI} from './api';

const api = createAPI((...args) => store.dispatch(...args));

const composeEnhancers =
  typeof window === `object` &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api))
    // other store enhancers if any
);

const store = createStore(reducer, enhancer);

store.dispatch(DataOperation.loadMovies());
store.dispatch(UserOperation.getLogin());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
