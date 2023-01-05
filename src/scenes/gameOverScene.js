
// Help gotten for this class from here: https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
// a scene presented when the player dies
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'gameOver'});
    }

    create() {
        const width = this.scale.gameSize._width;
        const height = this.scale.gameSize._height;
        const gameOverText = this.add.text(width/2, height/2, 'Game over', { fill: '#0f0', fontSize: 24 });
        const playAgainText = this.add.text(width/2, height/2 + 60, 'Press to play again', { fill: '#0f0', fontSize: 24 });
        const backHomeText = this.add.text(width/2, height/2 + 100, 'Press to go back to home page', { fill: '#0f0', fontSize: 24 });
        
        playAgainText.setInteractive()
            .on('pointerdown', () => {this.scene.start('level1');})
            .on('pointerover', () => {playAgainText.setStyle({ fill: '#ff0'});})
            .on('pointerout', () => {playAgainText.setStyle({ fill: '#0f0'});});
        backHomeText.setInteractive()
            .on('pointerdown', () => {window.location.href = "index.html";})
            .on('pointerover', () => {backHomeText.setStyle({ fill: '#ff0'});})
            .on('pointerout', () => {backHomeText.setStyle({ fill: '#0f0'});});
    }
}