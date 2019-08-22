import {
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  SELECT_TOKEN,
  UPDATE_BALANCE,
} from "../actionTypes";
import Token from "../../viewModels/Token";
import Account from "../../viewModels/Account"
import BigNumber from "bignumber.js";
import LocalStorage from "../../services/LocalStorage";

interface State {
  tokens: Token[],
  selectedToken?: Token
}

const initialState = {
  tokens: LocalStorage.getTokens() || Token.getAll(),
  selectedToken: undefined
};
export default function (state: State = initialState, action) {
  switch (action.type) {
    case SELECT_TOKEN: {
      const selectedToken = action.payload;
      return {
        ...state,
        selectedToken,
      };
    }

    case ADD_ACCOUNT: {
      const token: Token = action.payload.token;
      const account: Account = action.payload.account;
      let tokens;
      if ( account.accountType === 'burner' ) {
        token.addAccount(account);
        tokens = Token.replaceToken(state.tokens, token);
      } else {
        tokens = Token.addAccountToTokens(state.tokens, account);
      }
      LocalStorage.setTokens(tokens);
      return {
        ...state,
        tokens,
      }
    }

    case REMOVE_ACCOUNT: {
      const token: Token = action.payload.token;
      const account: Account = action.payload.account;
      let tokens;
      if ( account.accountType === 'burner' ) {
        token.removeAccount(account);
        tokens = Token.replaceToken(state.tokens, token);
      } else {
        tokens = Token.removeAccountFromTokens(state.tokens, account);
      }
      LocalStorage.setTokens(tokens);
      return {
        ...state,
        tokens,
      }
    }

    case UPDATE_BALANCE: {
      const token: Token = action.payload.token;
      const account: Account = action.payload.account;
      const balance: BigNumber = action.payload.balance;
      account.setBalance(balance);
      const updatedAccounts = token.replaceAccount(account);
      token.accounts = updatedAccounts;
      const tokens = Token.replaceToken(state.tokens, token);
      LocalStorage.setTokens(tokens);
      return {
        ...state,
        tokens,
      }
    }

    default:
      return state;
  }
}
