import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, Action } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose } from "recompose";

import App from 'App/components/app/app';
import reducer from "./reducer";
import { Operation as DataOperation } from "reducer/data/data";
import { Operation as UserOperation } from "reducer/user/user";
import { createAPI } from './api';

const api = createAPI((action: Action) => store.dispatch(action));

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (config: {}) => any;

const composeEnhancers =
  typeof window === `object` &&
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));

const store = createStore(reducer, enhancer);

store.dispatch(DataOperation.loadMovies() as any);
store.dispatch(UserOperation.getLogin() as any).then(() => store.dispatch(DataOperation.loadFavorites() as any))


ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
