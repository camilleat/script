import {Gpio} from 'onoff';


async function main() {
  const pinA = new Gpio(18, "in", "both");
  const pinB = new Gpio(23, "in", "both");

  let position = 0;
  console.log(`Encoder position: ${position}`);
  const currentState = pinA.read().then((currentState) => {
    console.log(`Current state of button :${currentState}`);
                });

  pinA.watch((err, valueA) => {
    if (err) {
      throw err;
    }
    pinB.read((err, valueB) => {
      if (err) {
        throw err;
      }
      if (valueA === valueB) {
        pos = pos++;
      } else {
        pos = pos--;
      }
      console.log(`Current position: ${pos}`);
    });
  });
}
