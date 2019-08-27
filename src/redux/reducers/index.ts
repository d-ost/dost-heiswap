import { combineReducers } from "redux";
import reserves from "./reserves";
import token from "./token";
import profile from './profile';
import transaction from './transaction'
import heiswap from "./heiswap";
import network from "./network";

export default combineReducers({
  reserves,
  token,
  profile,
  transaction,
  heiswap,
  network,
});
