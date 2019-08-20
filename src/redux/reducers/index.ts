import { combineReducers } from "redux";
import reserves from "./reserves";
import token from "./token";

export default combineReducers({
  reserves,
  token,
});
