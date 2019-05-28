import Namespace from "../namespaces";

const NAMESPACE = Namespace.USER;


export const getAuthorizationStatus = (state) => {
  return state[NAMESPACE].isAuthorizationRequired;
};
