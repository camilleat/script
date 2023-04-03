import {Gpio} from 'onoff';

const pinA = new Gpio(17, 'in', 'both');
const pinB = new Gpio(18, 'in', 'both');

// Initialisation du compteur
let counter = 0;

// Fonction pour détecter le mouvement du rotary encoder
function handleRotation(channel) {
  if (channel === pinA) {
    // Si la broche A a changé, déterminer la direction de rotation
    if (pinA.readSync() !== pinB.readSync()) {
      counter++;
    } else {
      counter--;
    }
  } else {
    // Si la broche B a changé, déterminer la direction de rotation
    if (pinA.readSync() === pinB.readSync()) {
      counter++;
    } else {
      counter--;
    }
  }

  // Afficher le nouveau compteur
  console.log('Compteur: ' + counter);
}

// Ajouter les écouteurs d'événements pour les broches du rotary encoder
pinA.watch(handleRotation);
pinB.watch(handleRotation);

// Arrêter la surveillance des broches et nettoyer les ressources lors de la fermeture de l'application
process.on('SIGINT', function () {
  pinA.unexport();
  pinB.unexport();
  process.exit();
});
