import { createAnimWithFrameNums } from "../../utility/registerAnimation.js";

export default class PortalSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, coords) {
        super(scene, coords.x, coords.y, 'portal');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.loadNextLevel = false;
        this.setScale(0.5);

        createAnimWithFrameNums(scene, 'portal', 'portal', 0, 202, 10, -1);

        this.anims.play('portal');

    }
}