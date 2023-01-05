import {getWidth, getHeight} from './browser_dimensions.js';
import GameOverScene from './scenes/gameOverScene.js';
import InitialPreload from './scenes/preload.js';
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import Level3 from './scenes/level3.js';
import VictoryScene from './scenes/victoryScene.js';

let width = getWidth();
let height = getHeight();

const colors = ["Black", "Blue", "Green", "Red", "Yellow"];

const showCreditsButton = document.getElementById("show-credits");
const playGameButton = document.getElementById("play");
const radioButtonSection = document.getElementById("colors");
const howToPlayButton = document.getElementById("how-to-play");

const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: [InitialPreload, GameOverScene, VictoryScene, Level1, Level2, Level3],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    playerColor: "Black"
}

howToPlayButton.addEventListener("click", () => {
    window.location.href = "howtoplay.html";
});

showCreditsButton.addEventListener("click", () => {
    window.location.href = "creditpage.html";
});

playGameButton.addEventListener("click", () => {
    const game = new Phaser.Game(config);

    // add player color property to game's configuration object. This needs to be done after game initialization to work.
    // Source for this 'trick' : https://www.stephengarside.co.uk/blog/phaser-3-custom-config-global-variables/
    for (let i = 0; i < colors.length; i++) {
        if (document.getElementById(colors[i]).checked) {
            game.config.playerColor = colors[i];
            break;
        }
    }
    howToPlayButton.remove();
    radioButtonSection.remove();
    showCreditsButton.remove();
    playGameButton.remove();
});




