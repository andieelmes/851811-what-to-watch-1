import Namespace from "../namespaces";
import { userInfo } from "os";

const NAMESPACE = Namespace.USER;


export const getAuthorizationStatus = (state) => {
  return !state[NAMESPACE].isAuthorizationRequired;
};

export const getUserInfo = (state) => {
  const {
    isAuthorizationRequired,
    ...userInfo
  } = state[NAMESPACE];
  return userInfo;
};
