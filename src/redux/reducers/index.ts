import { combineReducers } from "redux";
import reserves from "./reserves";
import token from "./token";
import profile from './profile';
import transaction from './transaction'
import heiswap from "./heiswap";

export default combineReducers({
  reserves,
  token,
  profile,
  transaction,
  heiswap,
});
