import { createAnimWithFrameNums } from "../../../utility/registerAnimation.js";

export default class BossBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y);

        this.scale = scale;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setScale(scale);
        this.alreadyHitSomething = false;

        createAnimWithFrameNums(scene, 'bossBullet', 'bossBullet', 0, 5, 10, -1);

        this.shoot = (x, y, direction) => {
            this.alreadyHitSomething = false;
            this.setVisible(true);
            this.x = x + direction * this.scale * 100;
            this.y = y;
            if (direction == -1) this.flipX = true; else this.flipX = false;
            this.setVelocityX(direction * 900);
            this.anims.play('bossBullet');
        }
    }
}