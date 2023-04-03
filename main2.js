import {Gpio} from 'onoff';

const pinA = new Gpio(18, "in", "both");
const pinB = new Gpio(23, "in", "both");

let position = 0;
console.log(`Encoder position: ${position}`);

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
