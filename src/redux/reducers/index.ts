import { combineReducers } from "redux";
import reserves from "./reserves";
import token from "./token";
import profile from './profile';
import heiswap from "./heiswap";
import network from "./network";

export default combineReducers({
  reserves,
  token,
  profile,
  heiswap,
  network,
});
