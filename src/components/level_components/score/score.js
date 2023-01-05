export default class ScoreText extends Phaser.GameObjects.Text {
    constructor(scene, x, y) {
        super(scene, x, y, 'score: 0', {
            color: '#FFFFFF',
            fontSize: 24
        });
        this.score = 0;
        scene.add.existing(this);
        this.setScrollFactor(0);

        this.addScore = (amount) => {this.score += amount; this.setText("score: " + this.score)};
    }

    getScore() {return this.score;}
}