// a scene presented when the player wins
export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({key: 'victoryScene'});
    }

    init(props) {
        this.finalScore = props.score;
    }

    create() {
        const width = this.scale.gameSize._width;
        const height = this.scale.gameSize._height;
        const victoryText = this.add.text(width/2, height/2, 'Victory!', { fill: '#0f0', fontSize: 24 });
        const scoreText = this.add.text(width/2, height/2 + 30, `Your score: ${this.finalScore}`, { fill: '#0f0', fontSize: 24 });
        const playAgainText = this.add.text(width/2, height/2 + 90, 'Press to play again', { fill: '#0f0', fontSize: 24 });
        const backHomeText = this.add.text(width/2, height/2 + 120, 'Press to go back to home page', { fill: '#0f0', fontSize: 24 });
        
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