import {CONNECT_RESERVE, DISCONNECT_RESERVE} from "../actionTypes";
import selectReserveModel, {ReserveAccount} from "../../models/SelectReserveModel";


interface State {
  reserves: ReserveAccount[];
}

const initialState = {
  reserves: selectReserveModel.getReserveAccountList(),
};
export default function (state: State = initialState, action) {
  switch (action.type) {
    case CONNECT_RESERVE: {
      const reserve: ReserveAccount = action.payload;
      const newReserves = state.reserves.filter(r => r.type !== reserve.type);
      newReserves.push(reserve);

      return {
        ...state,
        reserves: [...newReserves],
      };
    }
    case DISCONNECT_RESERVE:{
      const reserve: ReserveAccount = action.payload;
      const newReserves = state.reserves.filter(r => r.type !== reserve.type);
      newReserves.push(reserve);
      return {
        ...state,
        reserves: [...newReserves],
      };
    }
    default:
      return state;
  }
}
