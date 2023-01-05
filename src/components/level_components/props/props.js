export default class Prop extends Phaser.GameObjects.Image {
    constructor(scene, x, y, frame, scale) {
        super(scene, x, y, 'props', frame);
        scene.add.existing(this);
        this.setScale(scale);
    }
}