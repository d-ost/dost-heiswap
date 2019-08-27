 import {
  ADD_NETWORK_CONFIG,
  ADD_WALLET_TYPE,
  REMOVE_NETWORK_CONFIG,
  REMOVE_WALLET_TYPE
} from '../actionTypes';
 import {NetworkConfig, WalletType} from "../../viewModels/Network";

interface State {
  walletType: WalletType,
  networkConfig: NetworkConfig | undefined
}

const initialState = {
  walletType: WalletType.None,
  networkConfig: undefined
};

export default function (state: State = initialState, action) {
  switch (action.type) {
    case REMOVE_WALLET_TYPE: {
      const walletType = action.payload;

      return {
        ...state,
        walletType,
      };
    }

    case REMOVE_NETWORK_CONFIG: {
      const networkConfig = action.payload;

      return {
        ...state,
        networkConfig,
      };
    }

    case ADD_NETWORK_CONFIG: {
      const networkConfig = action.payload;
      return {
        ...state,
        networkConfig: networkConfig,
      };
    }

    case ADD_WALLET_TYPE: {
      const walletType = action.payload;
      return {
        ...state,
        walletType: walletType,
      };
    }

    default:
      return state;
  }
}
