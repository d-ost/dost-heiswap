import {
  CONNECT_RESERVE,
  DISCONNECT_RESERVE,
  SELECT_TOKEN
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
