import { createAnimWithFrames } from "../../../utility/registerAnimation.js";

export default class Flame extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setScale(scale);

        let frames = [];
        for (let i = 0; i <= 60; i++) frames.push({key: `fire${i}`});

        createAnimWithFrames(scene, 'fireEffect', frames, 30, -1);

        this.shootFlame = (x, y, direction) => {
            this.alreadyHitSomething = false;
            this.setVisible(true);
            this.setActive(true);
            this.x = x;
            this.y = y - 10;
            if (direction == -1) this.flipX = true; else this.flipX = false;
            this.setVelocityX(direction * 900);
            this.anims.play('fireEffect');
        }
    }
}