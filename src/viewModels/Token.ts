import Account from "./Account";

export default class Token {

  symbol: string;
  name: string;
  isBaseCurrency: boolean;
  erc20Address?: string;
  accounts: Account[];

  constructor(
    symbol: string,
    name: string,
    isBaseCurrency: boolean,
    erc20Address?: string
  ) {
    this.symbol = symbol;
    this.name = name;
    this.isBaseCurrency = isBaseCurrency;
    this.erc20Address = erc20Address;
    this.accounts = [];
  }

  static getAll() {
    return [
      new Token(
        'ETH',
        'Ether',
        true
      ),
      new Token(
        'OST',
        'Simple Token',
        false,
        '0xeaa192d486ac5243886a28001e27a68cae5fde4b'
      ),
      new Token(
        'wEth',
        'Wrapped Eth',
        false,
        '0xeaa192d486ac5243886a28001e27a68cae5fde4b'
      )
    ];
  }

  addAccount(account: Account) {
    this.accounts.push(account);
  }

  removeAccount(account: Account) {
    for(let index = 0; index < this.accounts.length; index += 1) {
      if( this.accounts[index].match(account) ) {
        // Remove account
        this.accounts.splice(index, 1);
        break;
      }
    }
  }

  match(token): boolean {
    return this.symbol === token.symbol;
  }

  /**
   * For bucket key add account to all tokens.
   * Bucket account can hold multiple tokens.
   * For Burner account add account to specific token.
   */
  static addAccountToTokens(tokens: Token[], account: Account): Token[] {
    const updatedTokens = tokens.map((t): Token => {
      t.addAccount(account);
      return t;
    });
    return updatedTokens;
  }

  /**
   * For bucket account remove account from all tokens.
   * Bucket account can hold multiple tokens.
   * For Burner account remove account from specific token.
   */
  static removeAccountFromTokens(tokens: Token[], account: Account): Token[] {
    // For bucket account
    const updatedTokens = tokens.map((t): Token => {
      t.removeAccount(account);
      return t;
    });
    return updatedTokens;
  }

  static replaceToken(tokens: Token[], token: Token) {
    const updatedTokens = tokens.map((t): Token => {
      if (t.match(token)) {
        return token;
      }
      return t;
    });
    return updatedTokens;
  }

}
