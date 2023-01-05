import { createAnimWithFrameNums } from "../../utility/registerAnimation.js";

export default class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y);
        createAnimWithFrameNums(scene, 'explosionEffect', 'explosion', 0, 63, 60, 0);
        scene.add.existing(this);
        this.setScale(scale);
        this.anims.play('explosionEffect').once('animationcomplete', () => this.destroy());
    }
}