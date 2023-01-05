import { createAnimWithFrameNums } from "../../../utility/registerAnimation.js";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y);

        this.scale = scale;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setSize(scale * 140, scale).setOffset(0, 0);
        this.setScale(scale);

        createAnimWithFrameNums(scene, 'laser', 'bossLaser', 0, 13, 10, 0);

        this.shoot = (x, y, direction) => {
            this.setActive(true);
            this.setVisible(true);
            this.x = x + direction * 100 * this.scale;
            this.y = y - 10;
            if (direction == -1) this.flipX = true; else this.flipX = false;
            this.anims.play('laser').once('animationcomplete', () => {
                this.setActive(false);
                this.setVisible(false);
            });
        }
    }
}