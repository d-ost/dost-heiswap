import {
  CONNECT_RESERVE,
  DISCONNECT_RESERVE,
  SELECT_TOKEN,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
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
