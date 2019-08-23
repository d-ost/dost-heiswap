import {
  CONNECT_RESERVE,
  DISCONNECT_RESERVE,
  SELECT_TOKEN,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  SAVE_PIN_HASH,
  UPDATE_BALANCE,
  ADD_TRANSACTION,
  ADD_HEISWAP_TOKEN, CLAIM_HEISWAP,
} from "./actionTypes";

export const connectToReserve = content => ({
  type: CONNECT_RESERVE,
  payload: content
});

export const disconnectToReserve = content => ({
  type: DISCONNECT_RESERVE,
  payload:content,
});

export const selectToken = content => ({
  type: SELECT_TOKEN,
  payload: content,
});

export const addAccount = content => ({
  type: ADD_ACCOUNT,
  payload: content,
});

export const removeAccount = content => ({
  type: REMOVE_ACCOUNT,
  payload: content,
});

export const savePinHash = content => ({
  type: SAVE_PIN_HASH,
  payload: content,
});

export const updateBalance = content => ({
  type: UPDATE_BALANCE,
  payload: content,
});

export const addTransaction = content => ({
  type: ADD_TRANSACTION,
  payload: content,
});

export const addHeiswapToken = content => ({
  type: ADD_HEISWAP_TOKEN,
  payload: content,
});

export const claimHeiswapToken = content => ({
  type: CLAIM_HEISWAP,
  payload: content,
})
