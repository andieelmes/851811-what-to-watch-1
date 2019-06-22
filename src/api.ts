import axios from 'axios';
import {ActionCreator} from 'App/reducer/user/user';
import {ENDPOINT_URL, TIMEOUT, ERROR_STATUS} from 'App/server-variables';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: ENDPOINT_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === ERROR_STATUS) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
