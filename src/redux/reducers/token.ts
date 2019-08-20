import {SELECT_TOKEN} from "../actionTypes";
import Token from "../../viewModels/Token";

interface State {
  tokens: Token[],
  selectedToken?: Token
}

const initialState = {
  tokens: Token.getAll(),
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

    default:
      return state;
  }
}
