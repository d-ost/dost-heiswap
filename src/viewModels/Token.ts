export default class Token {

  symbol: string;
  name: string;
  isBaseCurrency: boolean;
  erc20Address?: string;

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
      )
    ];
  }

}