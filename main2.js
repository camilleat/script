const Gpio = require("onoff").Gpio;

const pinA = new Gpio(24, "in", "both");
const pinB = new Gpio(25, "in", "both");

let position = 0;

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
