// Copyright 2019 LeapDAO.org MIT
// github.com/leapdao/plasma-burner-wallet

import Token from "../viewModels/Token";
import {HeiswapToken} from "./Heiswap/Heiswap";

class LocalStorage {


  constructor() {
  }

  getFromLocalStorage(key: string): any {
    const burnerJSON = localStorage.getItem(key);
    let burnerObject = {};
    if (burnerJSON) {
      burnerObject = JSON.parse(burnerJSON);
    }
    return burnerObject;
  }

  storePinHash(pinHash: string): void {
    localStorage.setItem('pin', pinHash);
  }

  getPinHash(): string | null {
    return localStorage.getItem('pin');
  }

  deletePinHash(): void {
    localStorage.removeItem('pin');
  }

  getTokens(): Token[] | null {
    const tokenList = localStorage.getItem('tokens');
    if (!tokenList) {
      return null;
    }

    return Token.fromJSON(tokenList);
  }

  setTokens(tokenList: Token[]) {
    localStorage.setItem('tokens', JSON.stringify(tokenList));
  }

  getHeiswapTokens(): HeiswapToken[] {
    const tokens = localStorage.getItem('heiswapToken');
    if (tokens == null) {
      return [];
    }
    return JSON.parse(tokens!);
  }

  setHeiswapTokens(heiswapTokens: HeiswapToken[]) {
    localStorage.setItem('heiswapToken', JSON.stringify(heiswapTokens));
  }
}

export default new LocalStorage();
