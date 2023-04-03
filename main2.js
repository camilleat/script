import {Gpio} from 'onoff';

const pinA = new Gpio(18, "in", "both");
const pinB = new Gpio(23, "in", "both");

let position = 0;
console.log(`Encoder position: ${position}`);
const currentState = pinA.read().then((currentState) => {
  console.log(`Current state of button :${currentState}`);
              });

async function main() {
  const pinA = new Gpio(17, 'in', 'both');

  while (true) {
    const currentState = await pinA.read();
    console.log(`Current state of button: ${currentState}`);
  }
}

main().catch(console.error);
