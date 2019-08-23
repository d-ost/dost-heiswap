import {ADD_HEISWAP_TOKEN, CLAIM_HEISWAP} from "../actionTypes";
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
        heiswapTokens: [...heiswapTokens],
      };
    }
    case CLAIM_HEISWAP: {
      const token: HeiswapToken = action.payload;
      const heiswapTokens = state.heiswapTokens.filter((ht) => ht.txHash !== token.txHash);
      heiswapTokens.push(token);
      LocalStorage.setHeiswapTokens(heiswapTokens);
      return {
        ...state,
        heiswapTokens: [...heiswapTokens],
      };
    }
    default:
      return state;
  }
}
