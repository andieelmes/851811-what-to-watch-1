import {ENDPOINT_URL} from 'server-variables';

const initialState = {
  isAuthorizationRequired: true,
  avatar: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_USER_DATA: `GET_USER_DATA`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  getUserData: (data) => {
    return {
      type: ActionType.GET_USER_DATA,
      payload: data,
    };
  },
};

const Operation = {
  login: (email, password) => (dispatch, _getState, api) => {
    console.log(email, password);
    return api.post(`/login`, {email, password})
      .then((response) => {
        const data = {
          avatar: `${ENDPOINT_URL}${response.data.avatar_url.replace(`/wtw`, ``)}`,
        }
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.getUserData(data));
      });
  },
};

const reducer = (state = initialState, action) => {
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
