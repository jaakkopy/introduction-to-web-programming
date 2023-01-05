export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y, 'bullet');
        this.refreshRange = scene.config.levelWidth;
        this.setScale(scale);
        this.alreadyHitSomething = false; // this is so that we know when a bullet should cause damage and when not
    }

    fire(x, y, direction) {
        this.body.reset(x + direction * 40, y - 4); // align the bullet to the gun
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(direction * 900);
        this.alreadyHitSomething = false;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.x - this.refreshRange >= 0 || this.x <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}