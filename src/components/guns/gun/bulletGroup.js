import Bullet from "./bullet.js";

// A class for a bullet group. Created with the help of this video: https://www.youtube.com/watch?v=9wvlAzKseCo
export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene, scale) {
        super(scene.physics.world, scene);
        this.scale = scale;
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet',
        });
        
    }

    shootBullet(x, y, direction) {
        const bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.setScale(this.scale);
            bullet.body.allowGravity = false;
            bullet.fire(x, y, direction);
        }
    }
}