export class Chains {

  private static chains = {
    '1': 'mainnet',
    '3': 'ropsten',
    '5': 'goerli'
  };

  public static getNetworkName(networkId: number): string {
    return this.chains[networkId.toString()];
  }
}
