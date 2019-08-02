import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Account from './KeyManager/Account'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// Please not this is not actual unit tests. this are quick calls to method to check if its working.
it('Generate Ethereum keys', () => {
  const account = Account.new();
  console.log('address: ', account.address);
  console.log('privateKey', account.privateKey);
  const accountAgain = Account.fromPrivateKey(account.privateKey);
  console.log('accountAgain address: ', accountAgain.address);
  console.log('accountAgain privateKey', accountAgain.privateKey);
  try {
    Account.fromPrivateKey('incorrect private key');
  } catch (e) {
    console.log('Execption was thrown as expected');
  }
  let result = Account.store(account, Account.KeyType.BURNER);
  console.log('result should be true', result);
  result = Account.store(account, Account.KeyType.MIXER);
  console.log('result should be true', result);
  account.address = 'asdasas';
  try {
    Account.store(account, Account.KeyType.BURNER);
  } catch (e) {
    console.log('Execption was thrown as expected');
  }
});
