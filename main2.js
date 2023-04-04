import { Gpio } from 'onoff';

const pinA = new Gpio(18, 'in');
const pinB = new Gpio(23, 'in');
console.log("hello");

let counter = 0;
let pinALastState = pinA.readSync();

while (true) {
  const pinAState = pinA.readSync();
  const pinBState = pinB.readSync();
  if (pinAState !== pinALastState) {
    if (pinBState !== pinAState) {
      counter += 1;
    } else {
      counter -= 1;
    }
    console.log(counter);
  }
  pinALastState = pinBState;
}
