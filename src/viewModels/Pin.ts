export default class Pin {

  pin: string;

  constructor(
    pin: string,
  ) {
    this.pin = pin;
  }

  validatePinCreation(confirmPin) {
    let errors = {pin: 'no-error', confirmPin: 'no-error'};
    const pin_minimum_size = Pin.get_minimum_size();
    if(this.pin.length < pin_minimum_size) {
      errors.pin = `Pin size should be greater or equal to ${pin_minimum_size}`;
    }

    if(confirmPin.length < pin_minimum_size){
      errors.confirmPin = `Pin size should be greater or equal to ${pin_minimum_size}`;
    }

    if (this.pin !== confirmPin) {
      errors.confirmPin = 'Pin mismatch!!!';
    }
    return errors;
  }

  savePin(){
    // Save pin in local storage
    console.log(`pin: ${this.pin}`);
  }

  verifyPin() {
    let errors = {pin: 'no-error'};
    const pin_minimum_size = Pin.get_minimum_size();
    if(this.pin.length < pin_minimum_size) {
      errors.pin = `Pin size should be greater or equal to ${pin_minimum_size}`;
    }
    return errors;
  }

  static get_minimum_size() {
    return 6;
  }

}