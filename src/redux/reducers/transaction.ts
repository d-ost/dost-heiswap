import { ADD_TRANSACTION } from '../actionTypes';
import LocalStorage from "../../services/LocalStorage";
import Transaction from "../../viewModels/Transaction";

interface State {
  transactions: Transaction[]
}

const initialState = {
  transactions: LocalStorage.getTransactions() || []
};

export default function (state: State = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION: {
      const transaction = new Transaction(
        action.payload.transactionHash,
        action.payload.transactionType,
        action.payload.data,
      );
      let transactions = state.transactions;
      transactions.push(transaction);
      LocalStorage.setTransactions(transactions);
      return {
        ...state,
        transactions,
      };
    }

    default:
      return state;
  }
}
