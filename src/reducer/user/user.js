import {ENDPOINT_URL} from 'server-variables';

const initialState = {
  isAuthorizationRequired: true,
  avatar: ``,
  name: ``,
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

const onLoginSuccess = (response, dispatch) => {
  const data = {
    avatar: `${ENDPOINT_URL}${response.data.avatar_url.replace(`/wtw`, ``)}`,
    name: response.data.name,
  }
  dispatch(ActionCreator.requireAuthorization(false));
  dispatch(ActionCreator.getUserData(data));
}

const Operation = {
  postLogin: (email, password, callback) => (dispatch, _getState, api) => {
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
  getLogin: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => onLoginSuccess(response, dispatch))
      .catch((error) => {
        console.log(error);
      })
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
