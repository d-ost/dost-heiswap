import {ADD_HEISWAP_TOKEN} from "../actionTypes";
import {HeiswapToken} from "../../services/Heiswap/Heiswap";
import LocalStorage from "../../services/LocalStorageV2";

interface State {
  heiswapTokens: HeiswapToken[];
}

const initialState = {
  heiswapTokens: LocalStorage.getHeiswapTokens()
};
export default function (state: State = initialState, action) {
  switch (action.type) {
    case ADD_HEISWAP_TOKEN: {
      const token: HeiswapToken = action.payload;
      const heiswapTokens = state.heiswapTokens;
      heiswapTokens.push(token);
      LocalStorage.setHeiswapTokens(heiswapTokens);
      return {
        ...state,
        reserves: [...heiswapTokens],
      };
    }
    default:
      return state;
  }
}
