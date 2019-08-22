 import { SAVE_PIN_HASH } from '../actionTypes';
 import LocalStorage from "../../services/LocalStorageV2";

interface State {
  pinHash: string
}

const initialState = {
  pinHash: LocalStorage.getPinHash() || ''
};

export default function (state: State = initialState, action) {
  switch (action.type) {
    case SAVE_PIN_HASH: {
      const pinHash = action.payload;
      // Save to local storage
      LocalStorage.storePinHash(pinHash);
      return {
        ...state,
        pinHash,
      };
    }

    default:
      return state;
  }
}
