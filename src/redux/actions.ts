import {CONNECT_RESERVE, DISCONNECT_RESERVE} from "./actionTypes";

export const connectToReserve = content => ({
  type: CONNECT_RESERVE,
  payload: content
});

export const disconnectToReserve = content => ({
  type: DISCONNECT_RESERVE,
  payload:content,
})
