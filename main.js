
// --------------------------------Gerer la liste des radios -----------------------------------------(Matys faut que tu mettes ton code la)

import VolumioWebsocket from "node-red-contrib-volumio/volumio.js";
const volumio = new VolumioWebsocket("172.20.10.8", 3000);

// URL de la webRadio
const radioUrl = 'http://icy.unitedradio.it/RMC.mp3';

// Fonction pour lancer la webRadio
volumio.connect();
volumio.command('addToQueue', {service: 'webradio',type: 'webradio',title: 'Nova%20La%20Nuit',uri: 'http://nova-ln.ice.infomaniak.ch/nova-ln-128',albumart: 'https://www.nova.fr/sites/default/files/2020-06/Nova%20la%20Nuit_1.jpg'});
volumio.command('play');



// -------------------- gérer les encodeurs -------------------------------------------------------
const { Board, Encoder } = require("johnny-five");
const {RaspiIO} = require("raspi-io");
const board = new Board({
  io: new RaspiIO()
});

board.on("ready", () => {
  //Creation d'un volumeEncoder qui gère le volume de la musique
  const volumeEncoder = new Encoder({
    pinA: "GPIO18", //faudra mettre les bons GPIO
    pinB: "GPIO23",
    pulseLength: 1,
  });

  volumeEncoder.on("change", (position) => {
    // Code to handle volume control events goes here
    console.log("Volume position:", position);
  });
  
  //le compteur qui fait -1 si 'prev' et +1 si 'next'
  let musicCount = 0;

  //Creation d'un musicEncoder qui gère la musique (les next et prev)
  const musicEncoder = new Encoder({
    pinA: "GPIO12",
    pinB: "GPIO16",
    pulseLength: 1, //en millisecondes
  });

  musicEncoder.on("change", (position) => {
    if (position > 0) {
      // The encoder was turned clockwise (next)
      musicCount++;
    } else if (position < 0) {
      // The encoder was turned counterclockwise (previous)
      musicCount--;
    }
    
    //permet d'afficher sur la console pour vois si on a un pb
    console.log(`Music position: ${position}, count: ${musicCount}`);
  });
});
