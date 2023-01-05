import BossBullet from "./bosssBullet.js";

export default class BossGun {
    constructor(scene, coords, scale, fireRate) {
        this.bullet = new BossBullet(scene, coords.x, coords.y, scale);
        this.fireRate = fireRate;
        this.canShoot = true;
    }

    ready() {
        return this.canShoot;
    }

    shoot(x, y, direction) {
        if (!this.canShoot) return;
        this.canShoot = false;
        this.bullet.shoot(x, y, direction);
        setTimeout(() => { this.canShoot = true }, this.fireRate);
    }

    registerForBulletHit(scene, spriteObject) {
        scene.physics.add.overlap(spriteObject, this.bullet, (sprite, bullet) => {
            if (!bullet.alreadyHitSomething) {
                sprite.removeHealthPoints(3);
                bullet.alreadyHitSomething = true;
            }
            this.bullet.setVisible(false);
        }, null, scene);
    }
}