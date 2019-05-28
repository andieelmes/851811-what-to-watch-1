import axios from 'axios';
import {ActionCreator} from 'reducer/user/user';
import {ENDPOINT_URL} from 'server-variables';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: ENDPOINT_URL,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
