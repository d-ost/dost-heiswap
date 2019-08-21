import * as web3Utils from 'web3-utils';

class Profile {

  validatePinCreation(pin:string, confirmPin:string) {
    let errors = {pin: 'no-error', confirmPin: 'no-error'};
    const pin_minimum_size = Profile.get_minimum_size();
    if(pin.length < pin_minimum_size) {
      errors.pin = `Pin size should be greater or equal to ${pin_minimum_size}`;
    }

    if(confirmPin.length < pin_minimum_size){
      errors.confirmPin = `Pin size should be greater or equal to ${pin_minimum_size}`;
    }

    if (pin !== confirmPin) {
      errors.confirmPin = 'Pin mismatch!!!';
    }
    return errors;
  }

  generatePinHash(pin: string): string {
    const noOfTimesToHash: number = this.getNumberOfTimesToHashPin(pin);
    let pinHash;
    for(let i = 0; i < noOfTimesToHash; i++) {
      pinHash = web3Utils.keccak256(pin);
      pin = pinHash;
    }
    return pinHash;
  }

  getNumberOfTimesToHashPin(pin: string): number {
    let sumOfAllCharCodeInPin = 0;
    let charCode;
    for(let i = 0; i < pin.length; i++) {
      charCode = pin.charCodeAt(i);
      sumOfAllCharCodeInPin = sumOfAllCharCodeInPin + charCode;
    }

    return (sumOfAllCharCodeInPin % 64);
  }

  verifyPin(pin: string, pinHash:string) {
    let errors = {pin: 'no-error'};
    const pin_minimum_size = Profile.get_minimum_size();
    if(pin.length < pin_minimum_size) {
      errors.pin = `Pin size should be greater or equal to ${pin_minimum_size}`;
    }
    const generatedPinHash = this.generatePinHash(pin);

    if(!(pinHash === generatedPinHash)) {
      errors.pin = 'Entered pin is incorrect. Provide correct pin';
    }
    return errors;
  }

  static get_minimum_size() {
    return 6;
  }

}

export default new Profile();
