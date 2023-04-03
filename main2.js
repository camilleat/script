import {Gpio} from 'onoff';

const pinA = new Gpio(18, "in", "both");
const pinB = new Gpio(23, "in", "both");

let position = 0;
console.log(`Encoder position: ${position}`);
const currentState = pinA.read().then((currentState) => {
  console.log(`Current state of button :${currentState}`);
              });

function handlePinChange(err, value) {
  if (err) {
    console.error('Error while reading pin state:', err);
    return;
  }

  console.log(`Current state of pin A: ${value}`);
}

// Listen for changes on the pin and trigger the callback function
pinA.watch(handlePinChange);


pinA.watch((err, valueA) => {
  if (err) {
    throw err;
  }

  pinB.read((err, valueB) => {
    if (err) {
      throw err;
    }

    const delta = valueA ^ valueB;

    if (delta & valueB) {
      position--;
    } else {
      position++;
    }

    console.log(`Encoder position: ${position}`);
  });
});
