import {ENDPOINT_URL} from 'App/server-variables';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

import {User} from 'App/types';
import { Dispatch } from 'react';

const initialState: User = {
  isAuthorizationRequired: true,
  avatar: ``,
  name: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_USER_DATA: `GET_USER_DATA`
};

const requireAuthorization: ActionCreator<Action> = (status: boolean) => {
  return {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  };
};

const getUserData: ActionCreator<Action> = (data: {avatar: string, name: string}) => {
  return {
    type: ActionType.GET_USER_DATA,
    payload: data,
  };
};

const ActionCreator = {
  requireAuthorization: requireAuthorization,
  getUserData: getUserData,
};

const onLoginSuccess = (response, dispatch: Dispatch<any>) => {
  const data = {
    avatar: `${ENDPOINT_URL}${response.data.avatar_url.replace(`/wtw`, ``)}`,
    name: response.data.name,
  }
  dispatch(ActionCreator.requireAuthorization(false));
  dispatch(ActionCreator.getUserData(data));
}

const Operation = {
  postLogin: (email: string, password: string, callback: () => void): ThunkAction<void, User, null, AnyAction> => (dispatch: ThunkDispatch<User, void, AnyAction>, _getState: () => User, api: any) => {
    return api.post(`/login`, {email, password})
      .then((response) =>
        {
          onLoginSuccess(response, dispatch);
          callback();
        }
      )
      .catch((error) => {
        console.log(error);
      })
  },
  getLogin: () :ThunkAction<void, User, null, AnyAction> => (dispatch: ThunkDispatch<User, void, AnyAction>, _getState: () => User, api: any) => {
    return api.get(`/login`)
      .then((response) => onLoginSuccess(response, dispatch))
      .catch((error) => {
        console.log(error);
      })
  },
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {...state, isAuthorizationRequired: action.payload}
    case ActionType.GET_USER_DATA: return {...state, ...action.payload}
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
