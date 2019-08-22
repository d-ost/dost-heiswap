import { combineReducers } from "redux";
import reserves from "./reserves";
import token from "./token";
import profile from './profile';
import heiswap from "./heiswap";

export default combineReducers({
  reserves,
  token,
  profile,
  heiswap,
});
