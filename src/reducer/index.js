import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as user} from "./user/user";
import Namespace from "./namespaces";

export default combineReducers({
  [Namespace.DATA]: data,
  [Namespace.USER]: user,
});
