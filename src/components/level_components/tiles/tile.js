export default class Tile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, whichFrame, scale) {
        super(scene, x, y, 'tile', whichFrame);

        this.setScale(scale);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        
    }
}