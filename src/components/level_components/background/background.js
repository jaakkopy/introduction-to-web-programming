export default class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene, whichFrame) {
        super(scene, 0, 0, 0, 0, 'background', whichFrame);
        scene.add.existing(this);

        this.setScale(this.scene.cameras.main.height/224);
        this.x = this.scene.cameras.main.centerX;
        this.y = this.scene.cameras.main.centerY;
        this.width = this.scene.cameras.main.width;
        this.setScrollFactor(0);
      }

    parallax() {this.tilePositionX = this.scene.cameras.main.worldView.x * 0.2}
}