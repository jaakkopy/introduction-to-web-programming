// a class for the icons the player can press when using mobile devices
export default class ControlSprite extends Phaser.GameObjects.Image {
    constructor(scene, x, y, imageKey, onPressFunction, onReleaseFunction) {
        super(scene, y, x, imageKey);
        scene.add.existing(this);
        this.setScale(0.8);
        let frame = this.frame;
        this.hitArea = new Phaser.Geom.Rectangle(frame.x, frame.y, frame.width, frame.height);
        this.setInteractive(this.hitArea, Phaser.Geom.Rectangle.Contains);

        this.on('pointerdown', onPressFunction);
        this.on('pointerup', onReleaseFunction);

        this.setX(x).setY(y).setScrollFactor(0);
    }
} 