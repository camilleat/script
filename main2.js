import { Gpio } from 'onoff';

const pinA = new Gpio(17, 'in', 'both');
const pinB = new Gpio(18, 'in', 'both');
let counter = 0;

function handleRotation(channel) {
  if (channel === pinA) {
    if (pinA.readSync() !== pinB.readSync()) {
      counter++;
    } else {
      counter--;
    }
  } else {
    if (pinA.readSync() === pinB.readSync()) {
      counter++;
    } else {
      counter--;
    }
  }

  console.log('Channel: ' + channel);
  console.log('Pin A: ' + pinA.readSync());
  console.log('Pin B: ' + pinB.readSync());
  console.log('Counter: ' + counter);
}

pinA.watch(handleRotation);
pinB.watch(handleRotation);

process.on('SIGINT', function () {
  pinA.unexport();
  pinB.unexport();
  process.exit();
});
